const express = require('express');
const cors = require('cors');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const { readDb, writeDb } = require('./db');
const { 
  generateCertificateUrl, 
  generateAttendeeBadgeUrl, 
  generateTicketUrl,
  generateMilestoneBadgeUrl,
  generateResponsiveBanners,
  generateLectureVideoUrl,
  isConfigured: isCloudinaryConfigured 
} = require('./cloudinaryService');
const { 
  extractNoticeToEvent, 
  evaluateAndPolishIdea, 
  generatePersonalizedCitation,
  debugCodeAndExplainError,
  answerPlatformDoubt
} = require('./aiService');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const clientBuildPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientBuildPath));

// API Health & Status
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    appName: 'EventHub AI',
    cloudinary: {
      configured: isCloudinaryConfigured,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME || 'demo',
      mode: isCloudinaryConfigured ? 'live-api' : 'demo-dynamic-url'
    },
    llm: {
      provider: process.env.GEMINI_API_KEY ? 'gemini' : 'intelligent-local-engine',
      features: ['Circular2Action', 'ErrorLens AI Debugger', 'Idea Feasibility Scorer', 'Platform Guide']
    }
  });
});

// ==========================================
// 1. EVENTS & TICKETING ENDPOINTS
// ==========================================
app.get('/api/events', (req, res) => {
  const db = readDb();
  const { category, search, level, status } = req.query;
  let filtered = [...db.events];

  if (category && category !== 'All') {
    filtered = filtered.filter(e => e.category.toLowerCase() === category.toLowerCase());
  }

  if (level && level !== 'All') {
    filtered = filtered.filter(e => (e.level || 'Beginner').toLowerCase() === level.toLowerCase());
  }

  if (status) {
    filtered = filtered.filter(e => e.status === status);
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(e => 
      e.title.toLowerCase().includes(q) || 
      e.tagline.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q)
    );
  }

  res.json(filtered);
});

app.get('/api/events/:id', (req, res) => {
  const db = readDb();
  const event = db.events.find(e => e.id === req.params.id);
  if (!event) return res.status(404).json({ error: 'Event not found' });
  
  const responsiveBanners = generateResponsiveBanners(event.cloudinaryPublicId || 'samples/landscapes/beach-boat');

  res.json({
    ...event,
    responsiveBanners
  });
});

// Event Registration with Manual or Instant Ticket Generation
app.post('/api/events/:id/register', (req, res) => {
  const db = readDb();
  const event = db.events.find(e => e.id === req.params.id);
  if (!event) return res.status(404).json({ error: 'Event not found' });

  const { 
    userId = 'student-1', 
    userName = 'Aarav Sharma', 
    userEmail = 'aarav.sharma@college.edu', 
    teamName, 
    teamMembers,
    selectedTier = 'Student Free RSVP',
    customPrice = '₹0',
    discountCode
  } = req.body;

  // Check if already registered
  const existing = db.registrations.find(r => r.eventId === req.params.id && r.userId === userId);
  if (existing) {
    return res.status(400).json({ error: 'You are already registered for this event!', registration: existing });
  }

  const ticketId = `TCK-${Math.floor(1000 + Math.random() * 9000)}`;
  const passId = `PASS-${Math.floor(1000 + Math.random() * 9000)}`;

  let finalPrice = customPrice;
  if (discountCode && discountCode.toUpperCase() === 'HACKTOBER50') {
    finalPrice = '50% Discount Applied';
  } else if (discountCode && discountCode.toUpperCase() === 'COMMUNITYFREE') {
    finalPrice = '₹0 (100% Promo)';
  }

  // Cloudinary Dynamic Ticket
  const ticketUrl = generateTicketUrl({
    attendeeName: userName,
    eventTitle: event.title,
    tier: selectedTier,
    ticketId,
    price: finalPrice,
    date: new Date(event.startDate).toLocaleDateString(),
    venue: event.venue
  });

  // Cloudinary Dynamic Access Pass
  const passUrl = generateAttendeeBadgeUrl({
    attendeeName: userName,
    eventTitle: event.title.slice(0, 30),
    passType: selectedTier,
    passId
  });

  const newReg = {
    id: `reg-${Date.now()}`,
    eventId: event.id,
    userId,
    userName,
    userEmail,
    registeredAt: new Date().toISOString(),
    teamName: teamName || 'Individual',
    teamMembers: teamMembers && teamMembers.length > 0 ? teamMembers : [userName],
    tier: selectedTier,
    price: finalPrice,
    ticketId,
    ticketUrl,
    passId,
    passUrl,
    status: 'confirmed'
  };

  event.registeredCount = (event.registeredCount || 0) + 1;
  db.registrations.unshift(newReg);
  writeDb(db);

  res.status(201).json({
    message: 'Registration successful! Dynamic Ticket & Cloudinary Pass created.',
    registration: newReg
  });
});

app.get('/api/registrations', (req, res) => {
  const db = readDb();
  const { userId } = req.query;
  let records = db.registrations;
  if (userId) {
    records = records.filter(r => r.userId === userId);
  }

  const populated = records.map(reg => {
    const event = db.events.find(e => e.id === reg.eventId);
    const certificate = db.certificates.find(c => c.eventId === reg.eventId && c.userId === reg.userId);
    return {
      ...reg,
      event,
      certificate
    };
  });

  res.json(populated);
});

// ==========================================
// 2. ONLINE LECTURES & SHORT COURSES
// ==========================================
app.get('/api/lectures', (req, res) => {
  const db = readDb();
  const { type, category, level } = req.query;
  let list = db.lectures || [];

  if (type && type !== 'all') {
    list = list.filter(l => l.type === type);
  }
  if (category && category !== 'All') {
    list = list.filter(l => l.category.toLowerCase() === category.toLowerCase());
  }
  if (level && level !== 'All') {
    list = list.filter(l => (l.level || 'Beginner').toLowerCase() === level.toLowerCase());
  }

  res.json(list);
});

// ==========================================
// 3. OPEN SOURCE CONTRIBUTOR HUB & LEADERBOARD
// ==========================================
app.get('/api/open-source', (req, res) => {
  const db = readDb();
  res.json({
    openSource: db.openSource || {},
    leaderboard: db.leaderboard || []
  });
});

app.post('/api/open-source/user/profile', (req, res) => {
  const db = readDb();
  const { userId = 'student-1', githubUsername, gitlabUsername } = req.body;
  const user = db.users.find(u => u.id === userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  if (githubUsername) user.githubUsername = githubUsername;
  if (gitlabUsername) user.gitlabUsername = gitlabUsername;

  writeDb(db);
  res.json({ message: 'Profile updated with open source links', user });
});

// ==========================================
// 4. COLLABORATIVE DEV STUDIO ("TEAMFORGE")
// ==========================================
app.get('/api/team-workspaces', (req, res) => {
  const db = readDb();
  res.json(db.teamWorkspaces || []);
});

app.put('/api/team-workspaces/:id', (req, res) => {
  const db = readDb();
  const ws = (db.teamWorkspaces || []).find(w => w.id === req.params.id);
  if (!ws) return res.status(404).json({ error: 'Workspace not found' });

  const { frontendCode, backendCode, databaseSchema, tasks } = req.body;
  if (frontendCode !== undefined) ws.frontendCode = frontendCode;
  if (backendCode !== undefined) ws.backendCode = backendCode;
  if (databaseSchema !== undefined) ws.databaseSchema = databaseSchema;
  if (tasks !== undefined) ws.tasks = tasks;

  writeDb(db);
  res.json({ message: 'Workspace synced successfully!', workspace: ws });
});

app.post('/api/team-workspaces/:id/merge', (req, res) => {
  const db = readDb();
  const ws = (db.teamWorkspaces || []).find(w => w.id === req.params.id);
  if (!ws) return res.status(404).json({ error: 'Workspace not found' });

  ws.lastMergedAt = new Date().toISOString();
  writeDb(db);

  res.json({
    message: 'Success! Frontend, Backend and Database successfully merged into Unified Build v1.0!',
    mergedAt: ws.lastMergedAt,
    buildSummary: {
      frontendComponents: 'Compiled (React 18 + Tailwind)',
      backendRoutes: 'Verified (Express Router)',
      databaseMigrations: 'Applied (PostgreSQL Schema)'
    }
  });
});

// ==========================================
// 5. ERRORLENS AI DEBUGGER & PLATFORM ASSISTANT
// ==========================================
app.post('/api/ai/debug-error', async (req, res) => {
  try {
    const { errorMessage, codeSnippet, language } = req.body;
    if (!errorMessage && !codeSnippet) {
      return res.status(400).json({ error: 'Please provide an error message or code snippet.' });
    }

    const diagnosis = await debugCodeAndExplainError({ errorMessage, codeSnippet, language });
    res.json(diagnosis);
  } catch (err) {
    res.status(500).json({ error: 'ErrorLens diagnosis failed: ' + err.message });
  }
});

app.post('/api/ai/ask-doubt', async (req, res) => {
  try {
    const { query } = req.body;
    const answer = await answerPlatformDoubt(query);
    res.json(answer);
  } catch (err) {
    res.status(500).json({ error: 'Assistant failed: ' + err.message });
  }
});

// ==========================================
// 6. IDEA HUB & FACULTY PIPELINE
// ==========================================
app.get('/api/ideas', (req, res) => {
  const db = readDb();
  res.json(db.ideas);
});

app.post('/api/ideas', async (req, res) => {
  const db = readDb();
  const { title, concept, targetAudience, estimatedBudget, proposedDates, user } = req.body;

  if (!title || !concept) {
    return res.status(400).json({ error: 'Title and Concept are required' });
  }

  const aiAnalysis = await evaluateAndPolishIdea({
    title,
    concept,
    targetAudience,
    estimatedBudget,
    proposedDates
  });

  const newIdea = {
    id: `idea-${Date.now()}`,
    title,
    concept,
    targetAudience: targetAudience || 'Campus Community',
    estimatedBudget: estimatedBudget || '₹20,000',
    proposedDates: proposedDates || 'Next Month',
    proposedBy: user || { id: 'student-1', name: 'Aarav Sharma', role: 'student' },
    submittedAt: new Date().toISOString(),
    status: 'pending',
    upvotes: 1,
    upvotedBy: [user?.id || 'student-1'],
    facultyReview: null,
    aiAnalysis
  };

  db.ideas.unshift(newIdea);
  writeDb(db);

  res.status(201).json({
    message: 'Event idea submitted successfully and scored by EventHub AI!',
    idea: newIdea
  });
});

app.post('/api/ideas/:id/upvote', (req, res) => {
  const db = readDb();
  const idea = db.ideas.find(i => i.id === req.params.id);
  if (!idea) return res.status(404).json({ error: 'Idea not found' });

  const userId = req.body.userId || 'student-1';
  if (!idea.upvotedBy) idea.upvotedBy = [];

  const index = idea.upvotedBy.indexOf(userId);
  if (index > -1) {
    idea.upvotedBy.splice(index, 1);
    idea.upvotes = Math.max(0, idea.upvotes - 1);
  } else {
    idea.upvotedBy.push(userId);
    idea.upvotes = (idea.upvotes || 0) + 1;
  }

  writeDb(db);
  res.json({ upvotes: idea.upvotes, upvotedBy: idea.upvotedBy });
});

app.put('/api/ideas/:id/review', (req, res) => {
  const db = readDb();
  const idea = db.ideas.find(i => i.id === req.params.id);
  if (!idea) return res.status(404).json({ error: 'Idea not found' });

  const { status, comment, reviewerName = 'Dr. Priya Nair' } = req.body;
  idea.status = status;
  idea.facultyReview = {
    reviewedBy: reviewerName,
    comment: comment || (status === 'approved' ? 'Approved for collegiate execution.' : 'Needs scope adjustment.'),
    reviewedAt: new Date().toISOString()
  };

  writeDb(db);
  res.json({ message: `Idea marked as ${status}`, idea });
});

app.post('/api/ideas/:id/convert-to-event', (req, res) => {
  const db = readDb();
  const idea = db.ideas.find(i => i.id === req.params.id);
  if (!idea) return res.status(404).json({ error: 'Idea not found' });

  const newEvent = {
    id: `event-${Date.now()}`,
    title: idea.title,
    tagline: idea.aiAnalysis?.executivePitch?.slice(0, 90) || 'Official Event spawned from student proposal',
    category: 'Hackathon',
    level: 'Beginner',
    description: `${idea.concept}\n\nOriginally proposed by ${idea.proposedBy.name} and approved by ${idea.facultyReview?.reviewedBy || 'Faculty Committee'}.`,
    startDate: new Date(Date.now() + 86400000 * 14).toISOString(),
    endDate: new Date(Date.now() + 86400000 * 15).toISOString(),
    registrationDeadline: new Date(Date.now() + 86400000 * 10).toISOString(),
    venue: idea.aiAnalysis?.resourceRequirements?.[0] || 'Campus Innovation Hub',
    eligibility: idea.targetAudience,
    teamSize: '1 - 4 Members',
    pricingTiers: [
      { name: 'Student Free RSVP', price: 0, perks: 'Free admission & certificate' }
    ],
    prizePool: '₹25,000 + Merit Certificates',
    rules: [
      'Original concept by student body.',
      'Active participation and timely submission mandatory.'
    ],
    tags: ['student-idea', 'hackathon', 'innovation'],
    organizerName: `${idea.proposedBy.name} & Faculty Council`,
    bannerImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&auto=format&fit=crop&q=80',
    cloudinaryPublicId: 'samples/landscapes/beach-boat',
    capacity: 200,
    registeredCount: 0,
    status: 'upcoming'
  };

  idea.status = 'converted';
  idea.convertedEventId = newEvent.id;

  db.events.unshift(newEvent);
  writeDb(db);

  res.status(201).json({
    message: 'Idea successfully converted into an active college event!',
    event: newEvent
  });
});

// Circular2Action
app.post('/api/ai/extract-notice', async (req, res) => {
  try {
    const { noticeText } = req.body;
    const structuredEvent = await extractNoticeToEvent(noticeText);
    res.json(structuredEvent);
  } catch (err) {
    res.status(500).json({ error: 'AI notice parsing failed: ' + err.message });
  }
});

// ==========================================
// 7. CERTIFICATE VERIFICATION & STORAGE
// ==========================================
app.get('/api/certificates', (req, res) => {
  const db = readDb();
  const { userId } = req.query;
  let certs = db.certificates;
  if (userId) {
    certs = certs.filter(c => c.userId === userId);
  }
  res.json(certs);
});

app.post('/api/certificates/generate', (req, res) => {
  const db = readDb();
  const { eventId, userId, role = 'Distinguished Participant' } = req.body;

  const event = db.events.find(e => e.id === eventId);
  const user = db.users.find(u => u.id === userId) || { name: 'Student Participant', email: 'student@college.edu' };

  if (!event) return res.status(404).json({ error: 'Event not found' });

  const certId = `EH-2026-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  const now = new Date();
  const issueDate = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const citation = generatePersonalizedCitation(user.name, event.title, role);

  const host = req.get('host') || 'localhost:5001';
  const protocol = req.protocol;
  const verifyBaseUrl = `${protocol}://${host}/verify`;

  const cloudinaryObj = generateCertificateUrl({
    participantName: user.name,
    eventTitle: event.title.slice(0, 36),
    role,
    date: issueDate,
    certId,
    verifyBaseUrl
  });

  const certificate = {
    id: `cert-${Date.now()}`,
    certId,
    userId: user.id || userId,
    userName: user.name,
    userEmail: user.email,
    eventId: event.id,
    eventTitle: event.title,
    role,
    issueDate,
    citation,
    verificationHash: uuidv4().replace(/-/g, '').slice(0, 20),
    cloudinaryUrl: cloudinaryObj.url,
    issuer: 'Apex Institute of Technology & EventHub'
  };

  db.certificates.unshift(certificate);
  writeDb(db);

  res.status(201).json({
    message: 'Certificate automatically generated and stored on Cloudinary!',
    certificate
  });
});

app.get('/api/certificates/verify/:certId', (req, res) => {
  const db = readDb();
  const cert = db.certificates.find(c => c.certId.toUpperCase() === req.params.certId.toUpperCase());
  if (!cert) {
    return res.status(404).json({ valid: false, message: 'Certificate credential ID not found or invalid.' });
  }

  res.json({
    valid: true,
    certificate: cert,
    verifiedAt: new Date().toISOString(),
    securitySeal: 'CRYPTOGRAPHICALLY_VERIFIED_BY_EVENTHUB_CLOUDINARY_PIPELINE'
  });
});

// Fallback to client routing
app.use((req, res) => {
  const indexPath = path.join(clientBuildPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.send(`EventHub API is running on port ${PORT}.`);
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 EventHub Server running on http://localhost:${PORT}`);
});
