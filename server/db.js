const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { 
  generateCertificateUrl, 
  generateAttendeeBadgeUrl, 
  generateTicketUrl, 
  generateMilestoneBadgeUrl,
  generateResponsiveBanners,
  generateLectureVideoUrl
} = require('./cloudinaryService');

const DB_FILE = path.join(__dirname, 'data.json');

const INITIAL_DATA = {
  users: [
    {
      id: 'student-1',
      name: 'Aarav Sharma',
      email: 'aarav.sharma@college.edu',
      role: 'student',
      department: 'Computer Science & Engineering',
      year: '3rd Year',
      githubUsername: 'aarav-sharma-dev',
      gitlabUsername: 'aarav_sharma',
      prsSubmitted: 8,
      prsMerged: 6,
      points: 480,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      badges: [
        {
          id: 'b-1',
          name: 'First Pull Request Merged',
          level: 'Gold Tier',
          earnedAt: '2026-10-15',
          cloudinaryUrl: generateMilestoneBadgeUrl({
            badgeName: 'First Pull Request Merged',
            recipientName: 'Aarav Sharma',
            level: 'Gold Tier'
          })
        },
        {
          id: 'b-2',
          name: 'Git Master',
          level: 'Elite Tier',
          earnedAt: '2026-10-20',
          cloudinaryUrl: generateMilestoneBadgeUrl({
            badgeName: 'Git Master',
            recipientName: 'Aarav Sharma',
            level: 'Elite Tier'
          })
        },
        {
          id: 'b-3',
          name: 'Cloudinary Media Wizard',
          level: 'Diamond Tier',
          earnedAt: '2026-10-24',
          cloudinaryUrl: generateMilestoneBadgeUrl({
            badgeName: 'Cloudinary Media Wizard',
            recipientName: 'Aarav Sharma',
            level: 'Diamond Tier'
          })
        }
      ]
    },
    {
      id: 'faculty-1',
      name: 'Dr. Priya Nair',
      email: 'priya.nair@college.edu',
      role: 'faculty',
      department: 'Department of AI & Data Science',
      designation: 'Associate Professor & Faculty Event Coordinator',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80'
    },
    {
      id: 'organizer-1',
      name: 'Rohan Mehta',
      email: 'rohan.mehta@college.edu',
      role: 'organizer',
      club: 'Apex Developers Club & Hackathon Lead',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80'
    }
  ],

  // Events with level filtering, agenda timeblocks, prerequisites, and FAQ
  events: [
    {
      id: 'event-101',
      title: 'Hacktoberfest 2026: AI & Cloud Innovation Hackathon',
      tagline: 'Build next-gen solutions using LLMs, Cloudinary Media APIs, and Open-Source Tech',
      category: 'Hackathon',
      level: 'Intermediate', // 'Beginner' | 'Intermediate' | 'Advanced'
      description: 'The flagship annual 36-hour hackathon bringing together over 500 collegiate developers, designers, and AI creators. Featuring live mentorship, food stalls, cash prizes, and instant Cloudinary-verified digital certificates.',
      startDate: '2026-10-28T09:00:00Z',
      endDate: '2026-10-29T21:00:00Z',
      registrationDeadline: '2026-10-26T23:59:59Z',
      venue: 'Main Innovation Lab & Auditorium Complex',
      eligibility: 'Open to all Engineering, Design, and BCA/MCA students across India',
      teamSize: '2 - 4 Members',
      pricingTiers: [
        { name: 'Student Free RSVP', price: 0, perks: 'Admission, Snacks, Discord Badge, Cloudinary Certificate' },
        { name: 'VIP Hackathon Pass', price: 199, perks: 'Exclusive Swag Bag, Cloud Credits, Priority Mentoring' },
        { name: 'Team Pack (4 pax)', price: 499, perks: 'Group discount, Dedicated Lab Workspace, Fast-track Review' }
      ],
      interactiveAgenda: [
        { time: '09:00 AM - 10:30 AM', title: 'Opening Ceremony & Keynote on Open-Source AI', speaker: 'Industry Guest & Faculty' },
        { time: '11:00 AM - 01:00 PM', title: 'Hands-on Cloudinary Dynamic Media Workshop', speaker: 'Cloudinary Ambassador' },
        { time: '02:00 PM - 08:00 PM', title: 'Sprint 1 & Live Mentor Troubleshooting Rooms', speaker: 'Active Maintainers' },
        { time: '09:00 PM - 11:00 PM', title: 'Midnight AI Gaming & Lightning Talks', speaker: 'Student Leads' }
      ],
      prerequisites: [
        'Laptop with Node.js v18+ and Git installed',
        'Active GitHub / GitLab account connected to your EventHub profile',
        'Basic familiarity with JavaScript/React or Python'
      ],
      faq: [
        { q: 'Is there any dress code?', a: 'Casual, comfortable attire is recommended for the 36-hour hackathon.' },
        { q: 'What is the refund policy for paid VIP tickets?', a: '100% refund available up to 48 hours prior to event kickoff.' },
        { q: 'Are hardware and high-speed Wi-Fi provided?', a: 'Yes! 1Gbps dual-band Wi-Fi and power strips are provided at all tables.' },
        { q: 'Is accessibility assistance available?', a: 'Wheelchair ramps and dedicated volunteer guides are available at Entrance Gate B.' }
      ],
      prizePool: '₹1,50,000 + Cloudinary Cloud Credits',
      rules: [
        'All repositories must be initialized and committed during the hackathon hours.',
        'Use of Cloudinary API for media optimization or transformation is rewarded with bonus points.',
        'Final pitch presentations must include a live working demo.'
      ],
      tags: ['hackathon', 'ai', 'cloudinary', 'open-source', 'cloud'],
      organizerName: 'Apex Developers Club',
      bannerImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80',
      cloudinaryPublicId: 'samples/landscapes/beach-boat',
      capacity: 500,
      registeredCount: 384,
      status: 'upcoming'
    },
    {
      id: 'event-102',
      title: 'Masterclass: Cloudinary Media AI & Dynamic Transformations',
      tagline: 'Master edge image optimization, generative AI fill, and dynamic credential generation',
      category: 'Workshop',
      level: 'Beginner',
      description: 'Hands-on interactive 3-hour developer workshop dissecting Cloudinary transformations, auto-cropping, text layer composition, and modern media pipelines with Node.js and React.',
      startDate: '2026-11-02T14:00:00Z',
      endDate: '2026-11-02T17:00:00Z',
      registrationDeadline: '2026-11-01T20:00:00Z',
      venue: 'Computing Lab 3 & Hybrid Stream',
      eligibility: 'All students with basic JavaScript / Web development knowledge',
      teamSize: 'Individual',
      pricingTiers: [
        { name: 'Free Student RSVP', price: 0, perks: 'Access to workshop, live code repo, completion certificate' }
      ],
      interactiveAgenda: [
        { time: '02:00 PM - 02:45 PM', title: 'Why Edge Transformations beat Server Puppeteer', speaker: 'Dr. Priya Nair' },
        { time: '02:45 PM - 04:00 PM', title: 'Building Dynamic Certificates with Cloudinary Layer APIs', speaker: 'Rohan Mehta' },
        { time: '04:00 PM - 05:00 PM', title: 'Live Code Challenge & Automated Badges', speaker: 'Mentor Panel' }
      ],
      prerequisites: [
        'VS Code or any preferred IDE',
        'Cloudinary Free Developer Account credentials'
      ],
      faq: [
        { q: 'Will the session be recorded?', a: 'Yes, recorded video will be posted under the Online Lectures section.' }
      ],
      prizePool: 'Merit Certificates + Cloudinary Swag Pack',
      rules: ['Bring your laptop with Node.js v18+ installed.'],
      tags: ['workshop', 'cloudinary', 'webdev', 'api'],
      organizerName: 'Dr. Priya Nair (Faculty Coordinator)',
      bannerImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80',
      cloudinaryPublicId: 'samples/landscapes/nature-mountains',
      capacity: 120,
      registeredCount: 94,
      status: 'upcoming'
    },
    {
      id: 'event-103',
      title: 'Maintainer Sprint: Advanced Open-Source Architecture',
      tagline: 'Deep dive into large codebase triage, AST parsing, and building production CI/CD',
      category: 'Hackathon',
      level: 'Advanced',
      description: 'Dedicated 2-day sprint for advanced student developers contributing directly to production-tier open source projects.',
      startDate: '2026-11-20T10:00:00Z',
      endDate: '2026-11-21T18:00:00Z',
      registrationDeadline: '2026-11-18T18:00:00Z',
      venue: 'R&D Center & Virtual Discord War Room',
      eligibility: 'Intermediate to advanced developers with at least 5 merged PRs',
      teamSize: 'Individual or Pairs',
      pricingTiers: [
        { name: 'Contributor RSVP', price: 0, perks: 'Maintainer pairing, swag pack, reference letter' }
      ],
      interactiveAgenda: [
        { time: '10:00 AM - 12:00 PM', title: 'Codebase Architecture Walkthrough & RFC Review', speaker: 'Senior Maintainers' },
        { time: '01:00 PM - 05:00 PM', title: 'Pair Programming & Bug Squashing Sprint', speaker: 'Community Teams' }
      ],
      prerequisites: [
        'Proficiency in TypeScript, Go, or Python',
        'Familiarity with Git rebase, submodules, and GitHub Actions'
      ],
      faq: [
        { q: 'Can 1st year students join?', a: 'Yes, if you have prior Git and coding experience!' }
      ],
      prizePool: '₹75,000 in Grants + Maintainer Badges',
      rules: ['All contributions must follow project PR standards.'],
      tags: ['advanced', 'git', 'maintainer', 'open-source'],
      organizerName: 'Open Source Guild',
      bannerImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80',
      cloudinaryPublicId: 'samples/people/jazz',
      capacity: 60,
      registeredCount: 42,
      status: 'upcoming'
    }
  ],

  // Online Lectures: Live vs. On-Demand Short Courses
  lectures: [
    {
      id: 'lec-1',
      title: 'Personal Finance, Angel Investing & Startup Equity for Engineers',
      type: 'live', // 'live' | 'on-demand'
      category: 'Finance',
      speaker: 'Siddharth Rao (FinTech Founder & Angel Investor)',
      speakerTitle: 'Ex-Goldman Sachs, Founder of FinPulse',
      date: '2026-10-30T16:00:00Z',
      duration: '90 Mins',
      level: 'Beginner',
      description: 'Master budgeting, personal wealth building, stock options (ESOPs), cap tables, and cryptocurrency risk management tailored specifically for engineers and students.',
      thumbnail: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80',
      videoUrl: generateLectureVideoUrl('samples/sea-turtle'),
      attendeeCount: 312,
      isLiveNow: false
    },
    {
      id: 'lec-2',
      title: 'Live CTF: Defensive Cybersecurity & Zero Trust Architectures',
      type: 'live',
      category: 'Cybersecurity',
      speaker: 'Col. Vikram Rathore (Cyber Defense Specialist)',
      speakerTitle: 'National Cybersecurity Advisor',
      date: '2026-11-04T15:00:00Z',
      duration: '120 Mins',
      level: 'Intermediate',
      description: 'Interactive live cyber war-game: defend a vulnerable microservices architecture from simulated ransomware, SQL injections, and DDoS attacks.',
      thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',
      videoUrl: generateLectureVideoUrl('samples/sea-turtle'),
      attendeeCount: 420,
      isLiveNow: false
    },
    {
      id: 'lec-3',
      title: 'Full-Stack Modern Rust: From Memory Safety to High-Speed Web APIs',
      type: 'on-demand',
      category: 'Programming',
      speaker: 'Elena Rostova (Rust Core Contributor)',
      speakerTitle: 'Principal Systems Architect',
      date: '2026-10-18',
      duration: '4 Modules (3.5 Hours)',
      level: 'Intermediate',
      description: 'Comprehensive video masterclass breaking down Rust ownership, borrow checker, Actix-web, and compiling WebAssembly for browser performance.',
      thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=80',
      videoUrl: generateLectureVideoUrl('samples/sea-turtle'),
      attendeeCount: 1250,
      isLiveNow: false
    },
    {
      id: 'lec-4',
      title: 'Cloudinary Programmable Media & Edge Transformations Masterclass',
      type: 'on-demand',
      category: 'Cloud & AI',
      speaker: 'Maya Lin (Cloudinary Dev Advocate)',
      speakerTitle: 'Senior Media Pipeline Engineer',
      date: '2026-10-22',
      duration: '3 Modules (2.5 Hours)',
      level: 'Beginner',
      description: 'Learn how to generate on-the-fly certificate overlays, dynamic social cards, video transcoding, and auto-cropping algorithms with Node.js.',
      thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
      videoUrl: generateLectureVideoUrl('samples/sea-turtle'),
      attendeeCount: 980,
      isLiveNow: false
    },
    {
      id: 'lec-5',
      title: 'Ethical Hacking: Web Application Penetration Testing & OWASP Top 10',
      type: 'on-demand',
      category: 'Cybersecurity',
      speaker: 'Arjun Nambiar (Bug Bounty Hunter)',
      speakerTitle: 'Hall of Fame at Google & Microsoft',
      date: '2026-10-12',
      duration: '5 Modules (4 Hours)',
      level: 'Advanced',
      description: 'Hands-on walkthrough of XSS, CSRF, broken access control, server-side request forgery (SSRF), and responsible disclosure ethics.',
      thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80',
      videoUrl: generateLectureVideoUrl('samples/sea-turtle'),
      attendeeCount: 1640,
      isLiveNow: false
    }
  ],

  // Curated Open Source Repositories & Good First Issues
  openSource: {
    curatedRepos: [
      {
        id: 'repo-1',
        name: 'eventhub/core',
        org: 'eventhub-ai',
        description: 'Open-source campus events and dynamic credential engine powered by Cloudinary and LLMs.',
        stars: '1.2k',
        language: 'JavaScript / React',
        url: 'https://github.com/eventhub-ai/core',
        goodFirstIssuesCount: 4,
        maintainer: 'Dr. Priya Nair'
      },
      {
        id: 'repo-2',
        name: 'cloudinary-react-overlays',
        org: 'cloudinary-community',
        description: 'Drop-in React components for dynamic text and badge URL generation on the edge.',
        stars: '850',
        language: 'TypeScript',
        url: 'https://github.com/cloudinary-community/react-overlays',
        goodFirstIssuesCount: 6,
        maintainer: 'Rohan Mehta'
      },
      {
        id: 'repo-3',
        name: 'campus-connect-mobile',
        org: 'student-dev-guild',
        description: 'Cross-platform React Native companion app for campus pass scanning and check-ins.',
        stars: '420',
        language: 'React Native',
        url: 'https://github.com/student-dev-guild/campus-connect',
        goodFirstIssuesCount: 3,
        maintainer: 'Aarav Sharma'
      }
    ],
    goodFirstIssues: [
      {
        id: 'issue-101',
        repo: 'eventhub/core',
        title: 'Add dark/light theme toggle in lecture video player',
        label: 'good-first-issue',
        points: 50,
        difficulty: 'Beginner',
        status: 'open',
        url: 'https://github.com/eventhub-ai/core/issues/101'
      },
      {
        id: 'issue-102',
        repo: 'cloudinary-react-overlays',
        title: 'Support custom hex colors in font overlay builder',
        label: 'good-first-issue',
        points: 75,
        difficulty: 'Beginner',
        status: 'open',
        url: 'https://github.com/cloudinary-community/react-overlays/issues/102'
      },
      {
        id: 'issue-103',
        repo: 'eventhub/core',
        title: 'Implement debounce search on curated open-source repository list',
        label: 'good-first-issue',
        points: 100,
        difficulty: 'Intermediate',
        status: 'open',
        url: 'https://github.com/eventhub-ai/core/issues/103'
      },
      {
        id: 'issue-104',
        repo: 'campus-connect-mobile',
        title: 'Handle offline caching for Cloudinary digital tickets',
        label: 'first-timers-only',
        points: 120,
        difficulty: 'Intermediate',
        status: 'open',
        url: 'https://github.com/student-dev-guild/campus-connect/issues/104'
      }
    ],
    cheatSheets: [
      {
        title: 'Git Commands Essential Cheat Sheet',
        category: 'Git & GitHub',
        content: `### Git Core Workflow
\`\`\`bash
git clone <repo-url>
git checkout -b feat/my-awesome-feature
git add .
git commit -m "feat: add dynamic certificate download"
git push origin feat/my-awesome-feature
\`\`\`
### Clean Rebasing
\`\`\`bash
git fetch upstream
git rebase upstream/main
\`\`\``
      },
      {
        title: 'Open Source Etiquette & Writing PRs that get Merged',
        category: 'Community Rules',
        content: `1. **Always link the issue**: Use \`Fixes #101\` in your PR description.
2. **Keep PRs atomic**: One bug or one feature per pull request.
3. **Include tests & screenshots**: Show before/after visual proof for UI changes.
4. **Be respectful**: Thank maintainers for their code reviews and time.`
      }
    ],
    mentors: [
      {
        name: 'Dr. Priya Nair',
        role: 'Faculty Coordinator & Systems Mentor',
        specialties: ['AI/LLM Architecture', 'Full-Stack Systems'],
        available: true,
        discordTag: 'priya_nair#1204'
      },
      {
        name: 'Rohan Mehta',
        role: 'Open Source Guild Lead',
        specialties: ['Cloudinary APIs', 'React / Tailwind'],
        available: true,
        discordTag: 'rohan_dev#8891'
      },
      {
        name: 'Sanya Gupta',
        role: 'Senior Maintainer',
        specialties: ['Cybersecurity', 'Git Workflows'],
        available: true,
        discordTag: 'sanya_sec#3341'
      }
    ]
  },

  // Collaborative Dev Studio ("TeamForge")
  teamWorkspaces: [
    {
      id: 'team-ws-1',
      teamName: 'Team NeuralKnights',
      projectTitle: 'Smart Campus AI Portal',
      members: ['Aarav Sharma (Lead)', 'Sanya Gupta (Frontend)', 'Kabir Verma (Backend)'],
      frontendCode: `// Frontend: React Component
import React from 'react';

export default function CampusBadge({ name, role }) {
  return (
    <div className="p-4 bg-indigo-900 rounded-2xl text-white">
      <h3 className="font-bold">{name}</h3>
      <p className="text-xs text-indigo-300">{role}</p>
    </div>
  );
}`,
      backendCode: `// Backend: Express API Endpoint
app.post('/api/attendance/checkin', (req, res) => {
  const { passId, studentId } = req.body;
  // Verify dynamic Cloudinary signature
  res.json({ verified: true, timestamp: Date.now() });
});`,
      databaseSchema: `-- Database Schema: PostgreSQL
CREATE TABLE attendees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name VARCHAR(100) NOT NULL,
  ticket_code VARCHAR(30) UNIQUE NOT NULL,
  cloudinary_cert_url TEXT,
  checked_in BOOLEAN DEFAULT FALSE
);`,
      tasks: [
        { id: 1, title: 'Integrate Cloudinary text overlays', assignedTo: 'Sanya', status: 'done' },
        { id: 2, title: 'Connect ErrorLens AI Tutor to chat', assignedTo: 'Kabir', status: 'in-progress' },
        { id: 3, title: 'Configure GitHub PR webhook', assignedTo: 'Aarav', status: 'todo' }
      ],
      lastMergedAt: '2026-10-24T19:30:00Z'
    }
  ],

  // Live Contributor Leaderboard
  leaderboard: [
    { rank: 1, name: 'Aarav Sharma', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100', prsMerged: 6, points: 480, badge: 'Git Master' },
    { rank: 2, name: 'Sanya Gupta', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100', prsMerged: 5, points: 410, badge: 'Bug Hunter' },
    { rank: 3, name: 'Kabir Verma', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100', prsMerged: 4, points: 340, badge: 'Cloudinary Wizard' },
    { rank: 4, name: 'Ananya Iyer', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', prsMerged: 4, points: 310, badge: 'PR Pioneer' },
    { rank: 5, name: 'Vikram Sen', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100', prsMerged: 3, points: 260, badge: 'First PR' }
  ],

  // Ideas & Proposals
  ideas: [
    {
      id: 'idea-201',
      title: 'PromptForge: Generative AI Short Film & Prompt Sprint',
      concept: 'A 12-hour creative sprint where students use open-weight LLMs, generative video tools, and audio synthesis to create 2-minute short films tackling social awareness themes. Cloudinary would host and auto-transcode all video assets.',
      targetAudience: 'Computer Science, Media Studies, and Animation students (approx. 150 participants)',
      estimatedBudget: '₹25,000',
      proposedDates: 'Mid November 2026 (Post Mid-terms)',
      proposedBy: {
        id: 'student-1',
        name: 'Aarav Sharma',
        role: 'student'
      },
      submittedAt: '2026-10-22T10:30:00Z',
      status: 'pending',
      upvotes: 42,
      upvotedBy: ['student-1', 'organizer-1'],
      facultyReview: {
        reviewedBy: 'Dr. Priya Nair',
        comment: 'Promising concept! Blends technical generative AI capabilities with creative arts. Ensure GPU lab is booked in advance.',
        reviewedAt: '2026-10-23T15:20:00Z'
      },
      aiAnalysis: {
        feasibilityScore: 88,
        feasibilityRating: 'High Feasibility',
        executivePitch: '"PromptForge" provides an experiential bridge between computational generative models and digital humanities. It maximizes lab utilization without high external rental expenses.',
        budgetBreakdown: [
          { item: 'Refreshments & Midnight Snacks', estimatedCost: '₹9,000', justification: 'Energy support for 12-hour sprint' },
          { item: 'Prizes & Trophies', estimatedCost: '₹10,000', justification: 'Top 3 film awards' },
          { item: 'Jury Honorarium (Industry Filmmaker/AI Creator)', estimatedCost: '₹4,000', justification: 'Expert evaluation' },
          { item: 'Cloudinary Media Storage & Bandwidth Buffer', estimatedCost: '₹2,000', justification: 'Hosting high-res video deliverables' }
        ],
        resourceRequirements: [
          'High-performance Graphics Lab (Lab 5 & 6)',
          'Guest Lecture Hall for final screening ceremony',
          'Faculty Coordinator approval for weekend building access'
        ]
      }
    },
    {
      id: 'idea-202',
      title: 'GreenCampus IoT & Clean Energy Hackathon',
      concept: 'Students build IoT sensor nodes to monitor water leakages, classroom electricity waste, and solar generation on the campus roofs, presenting real-time dashboards to college management.',
      targetAudience: 'Electrical, Electronics, and Software engineering students',
      estimatedBudget: '₹35,000',
      proposedDates: 'December 2026',
      proposedBy: {
        id: 'student-1',
        name: 'Aarav Sharma',
        role: 'student'
      },
      submittedAt: '2026-10-18T11:00:00Z',
      status: 'approved',
      upvotes: 68,
      upvotedBy: ['student-1', 'faculty-1'],
      facultyReview: {
        reviewedBy: 'Dr. Priya Nair',
        comment: 'Officially approved by Academic Council. Fits our campus sustainability mission perfectly. Proceed with event schedule conversion.',
        reviewedAt: '2026-10-21T09:45:00Z'
      },
      aiAnalysis: {
        feasibilityScore: 92,
        feasibilityRating: 'High Feasibility',
        executivePitch: '"GreenCampus IoT" delivers direct institutional ROI by identifying campus energy waste while teaching embedded engineering.',
        budgetBreakdown: [
          { item: 'IoT Starter Kits (ESP32 + Sensors for 15 teams)', estimatedCost: '₹18,000', justification: 'Hardware loan kits' },
          { item: 'Prizes & Institutional Recognition', estimatedCost: '₹12,000', justification: 'Winning team implementation grant' },
          { item: 'Snacks & Certificates', estimatedCost: '₹5,000', justification: 'Participant hospitality' }
        ],
        resourceRequirements: [
          'IoT & Embedded Systems Lab access',
          'Permission to inspect campus electrical distribution boxes with estate office supervisor'
        ]
      }
    }
  ],

  // Registrations with digital tickets
  registrations: [
    {
      id: 'reg-301',
      eventId: 'event-101',
      userId: 'student-1',
      userName: 'Aarav Sharma',
      userEmail: 'aarav.sharma@college.edu',
      registeredAt: '2026-10-20T14:15:00Z',
      teamName: 'NeuralKnights',
      tier: 'VIP Hackathon Pass',
      ticketId: 'TCK-8819',
      ticketUrl: generateTicketUrl({
        attendeeName: 'Aarav Sharma',
        eventTitle: 'Hacktoberfest 2026',
        tier: 'VIP Hackathon Pass',
        ticketId: 'TCK-8819',
        price: '₹199',
        date: 'Oct 28, 2026',
        venue: 'Main Innovation Lab'
      }),
      passId: 'PASS-7890',
      passUrl: generateAttendeeBadgeUrl({
        attendeeName: 'Aarav Sharma',
        eventTitle: 'Hacktoberfest 2026',
        passType: 'Team Lead',
        passId: 'PASS-7890'
      }),
      status: 'confirmed'
    },
    {
      id: 'reg-302',
      eventId: 'event-102',
      userId: 'student-1',
      userName: 'Aarav Sharma',
      userEmail: 'aarav.sharma@college.edu',
      registeredAt: '2026-10-21T09:10:00Z',
      teamName: 'Individual',
      tier: 'Free Student RSVP',
      ticketId: 'TCK-4412',
      ticketUrl: generateTicketUrl({
        attendeeName: 'Aarav Sharma',
        eventTitle: 'Cloudinary Masterclass',
        tier: 'Free Student RSVP',
        ticketId: 'TCK-4412',
        price: '₹0 (Free)',
        date: 'Nov 02, 2026',
        venue: 'Computing Lab 3'
      }),
      passId: 'PASS-4412',
      passUrl: generateAttendeeBadgeUrl({
        attendeeName: 'Aarav Sharma',
        eventTitle: 'Cloudinary Masterclass',
        passType: 'Attendee',
        passId: 'PASS-4412'
      }),
      status: 'confirmed'
    }
  ],

  // Verified Certificates
  certificates: [
    {
      id: 'cert-401',
      certId: 'EH-2026-X89B',
      userId: 'student-1',
      userName: 'Aarav Sharma',
      userEmail: 'aarav.sharma@college.edu',
      eventId: 'event-101',
      eventTitle: 'Hacktoberfest 2026: AI & Cloud Innovation',
      role: '1st Place Winner - Autonomous Navigation',
      issueDate: 'October 16, 2026',
      citation: 'For displaying exemplary engineering mastery and autonomous pathfinding algorithms to achieve First Place Honors in Hacktoberfest 2026.',
      verificationHash: '9a8b7c6d5e4f3a2b1c0d',
      cloudinaryUrl: generateCertificateUrl({
        participantName: 'Aarav Sharma',
        eventTitle: 'Hacktoberfest 2026',
        role: '1st Place Winner',
        date: 'Oct 16 2026',
        certId: 'EH-2026-X89B'
      }).url,
      issuer: 'Apex Institute of Technology & IEEE Student Branch'
    },
    {
      id: 'cert-402',
      certId: 'EH-2026-C44Z',
      userId: 'student-1',
      userName: 'Aarav Sharma',
      userEmail: 'aarav.sharma@college.edu',
      eventId: 'event-102',
      eventTitle: 'Cloudinary Media AI & Dynamic Transformations Masterclass',
      role: 'Distinguished Participant',
      issueDate: 'October 24, 2026',
      citation: 'In recognition of active engagement and successful implementation of dynamic Cloudinary text overlays and automated credential pipelines.',
      verificationHash: '3f2e1d0c9b8a7f6e5d4c',
      cloudinaryUrl: generateCertificateUrl({
        participantName: 'Aarav Sharma',
        eventTitle: 'Cloudinary Media Masterclass',
        role: 'Distinguished Participant',
        date: 'Oct 24 2026',
        certId: 'EH-2026-C44Z'
      }).url,
      issuer: 'Apex Developers Club'
    }
  ]
};

function readDb() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_DATA, null, 2), 'utf8');
    return INITIAL_DATA;
  }
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading DB, using initial data:', err);
    return INITIAL_DATA;
  }
}

function writeDb(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// Force sync initial rich data
fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_DATA, null, 2), 'utf8');

module.exports = {
  readDb,
  writeDb
};
