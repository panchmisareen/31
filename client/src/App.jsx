import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import EventCard from './components/EventCard';
import EventDetailModal from './components/EventDetailModal';
import OnlineLectures from './components/OnlineLectures';
import OpenSourceHub from './components/OpenSourceHub';
import TeamForgeCollab from './components/TeamForgeCollab';
import ErrorLensAssistant from './components/ErrorLensAssistant';
import IdeaHub from './components/IdeaHub';
import ParticipationVault from './components/ParticipationVault';
import CircularExtractor from './components/CircularExtractor';
import CloudinaryShowcase from './components/CloudinaryShowcase';
import CertificateVerifier from './components/CertificateVerifier';
import { Search, Filter, Sparkles, Plus, Calendar, Award, Lightbulb, Cloud, Video, GitPullRequest, Users, Bug } from 'lucide-react';

const USERS = [
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
      { id: 'b-1', name: 'First Pull Request Merged', level: 'Gold Tier', cloudinaryUrl: 'https://res.cloudinary.com/demo/image/upload/w_600,h_600,c_fill,b_rgb:0f172a,r_max/e_tint:90:purple/l_text:Cinzel_20_bold:HACKTOBERFEST%20BADGE,co_rgb:c084fc,g_north,y_80/l_text:Playfair%20Display_26_bold:FIRST%20PULL%20REQUEST%20MERGED,co_rgb:fef08a,g_center,y_-30/l_text:Roboto_18:Conferred%20Upon,co_rgb:94a3b8,g_center,y_40/l_text:Playfair%20Display_28_bold:Aarav%20Sharma,co_rgb:ffffff,g_center,y_80/l_text:Roboto_14_bold:Gold%20Tier,co_rgb:34d399,g_south,y_80/q_auto,f_auto/samples/people/boy-snow-hoodie.jpg' },
      { id: 'b-2', name: 'Git Master', level: 'Elite Tier', cloudinaryUrl: 'https://res.cloudinary.com/demo/image/upload/w_600,h_600,c_fill,b_rgb:0f172a,r_max/e_tint:90:purple/l_text:Cinzel_20_bold:HACKTOBERFEST%20BADGE,co_rgb:c084fc,g_north,y_80/l_text:Playfair%20Display_26_bold:GIT%20MASTER,co_rgb:fef08a,g_center,y_-30/l_text:Roboto_18:Conferred%20Upon,co_rgb:94a3b8,g_center,y_40/l_text:Playfair%20Display_28_bold:Aarav%20Sharma,co_rgb:ffffff,g_center,y_80/l_text:Roboto_14_bold:Elite%20Tier,co_rgb:34d399,g_south,y_80/q_auto,f_auto/samples/people/boy-snow-hoodie.jpg' },
      { id: 'b-3', name: 'Cloudinary Media Wizard', level: 'Diamond Tier', cloudinaryUrl: 'https://res.cloudinary.com/demo/image/upload/w_600,h_600,c_fill,b_rgb:0f172a,r_max/e_tint:90:purple/l_text:Cinzel_20_bold:HACKTOBERFEST%20BADGE,co_rgb:c084fc,g_north,y_80/l_text:Playfair%20Display_26_bold:CLOUDINARY%20MEDIA%20WIZARD,co_rgb:fef08a,g_center,y_-30/l_text:Roboto_18:Conferred%20Upon,co_rgb:94a3b8,g_center,y_40/l_text:Playfair%20Display_28_bold:Aarav%20Sharma,co_rgb:ffffff,g_center,y_80/l_text:Roboto_14_bold:Diamond%20Tier,co_rgb:34d399,g_south,y_80/q_auto,f_auto/samples/people/boy-snow-hoodie.jpg' }
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
];

export default function App() {
  const [activeTab, setActiveTab] = useState('events');
  const [currentUser, setCurrentUser] = useState(USERS[0]);
  const [events, setEvents] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [openSourceData, setOpenSourceData] = useState({});
  const [leaderboard, setLeaderboard] = useState([]);
  const [teamWorkspaces, setTeamWorkspaces] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Search & Level Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [levelFilter, setLevelFilter] = useState('All'); // 'All' | 'Beginner' | 'Intermediate' | 'Advanced'
  const [loading, setLoading] = useState(true);

  // Toast / feedback message
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const loadData = async () => {
    try {
      const [eventsRes, ideasRes, regsRes, certsRes, lecRes, osRes, wsRes] = await Promise.all([
        fetch('/api/events'),
        fetch('/api/ideas'),
        fetch(`/api/registrations?userId=${currentUser.id}`),
        fetch(`/api/certificates?userId=${currentUser.id}`),
        fetch('/api/lectures'),
        fetch('/api/open-source'),
        fetch('/api/team-workspaces')
      ]);

      if (eventsRes.ok) setEvents(await eventsRes.json());
      if (ideasRes.ok) setIdeas(await ideasRes.json());
      if (regsRes.ok) setRegistrations(await regsRes.json());
      if (certsRes.ok) setCertificates(await certsRes.json());
      if (lecRes.ok) setLectures(await lecRes.json());
      if (osRes.ok) {
        const os = await osRes.json();
        setOpenSourceData(os.openSource || {});
        setLeaderboard(os.leaderboard || []);
      }
      if (wsRes.ok) setTeamWorkspaces(await wsRes.json());
    } catch (err) {
      console.error('Failed to load initial data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [currentUser]);

  // Handle Event Registration with Tiers
  const handleRegister = async (eventId, teamName, members, selectedTier, customPrice, discountCode) => {
    try {
      const res = await fetch(`/api/events/${eventId}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser.id,
          userName: currentUser.name,
          userEmail: currentUser.email,
          teamName,
          teamMembers: members,
          selectedTier,
          customPrice,
          discountCode
        })
      });

      const data = await res.json();
      if (res.ok) {
        showToast('Successfully registered! Cloudinary Dynamic Ticket & Pass generated.');
        loadData();
      } else {
        showToast(data.error || 'Registration failed', 'error');
      }
    } catch (err) {
      showToast('Network error: ' + err.message, 'error');
    }
  };

  // Update Open Source Portfolio Links
  const handleUpdateProfile = async (profilePayload) => {
    try {
      const res = await fetch('/api/open-source/user/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profilePayload)
      });
      if (res.ok) {
        showToast('Open Source profile links saved!');
        setCurrentUser(prev => ({
          ...prev,
          githubUsername: profilePayload.githubUsername,
          gitlabUsername: profilePayload.gitlabUsername
        }));
      }
    } catch (err) {
      showToast('Error saving profile: ' + err.message, 'error');
    }
  };

  // Save Team Workspace
  const handleSaveWorkspace = async (wsId, wsPayload) => {
    try {
      const res = await fetch(`/api/team-workspaces/${wsId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(wsPayload)
      });
      if (res.ok) {
        showToast('Team Workspace synchronized!');
        loadData();
      }
    } catch (err) {
      showToast('Sync error: ' + err.message, 'error');
    }
  };

  // Merge Team Workspace
  const handleMergeWorkspace = async (wsId) => {
    try {
      const res = await fetch(`/api/team-workspaces/${wsId}/merge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (res.ok) {
        showToast('Success! Frontend, Backend & DB merged!');
        loadData();
        return data;
      }
    } catch (err) {
      showToast('Merge error: ' + err.message, 'error');
    }
  };

  // Submit Idea
  const handleNewIdea = async (ideaPayload) => {
    try {
      const res = await fetch('/api/ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ideaPayload)
      });
      const data = await res.json();
      if (res.ok) {
        showToast('Event idea submitted and evaluated by AI!');
        loadData();
      } else {
        showToast(data.error || 'Failed to submit idea', 'error');
      }
    } catch (err) {
      showToast('Error: ' + err.message, 'error');
    }
  };

  // Upvote Idea
  const handleUpvote = async (ideaId) => {
    try {
      const res = await fetch(`/api/ideas/${ideaId}/upvote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser.id })
      });
      if (res.ok) loadData();
    } catch (err) {
      console.error(err);
    }
  };

  // Faculty Review Idea
  const handleReviewIdea = async (ideaId, status, comment) => {
    try {
      const res = await fetch(`/api/ideas/${ideaId}/review`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, comment, reviewerName: currentUser.name })
      });
      if (res.ok) {
        showToast(`Idea marked as ${status} by ${currentUser.name}`);
        loadData();
      }
    } catch (err) {
      showToast('Error: ' + err.message, 'error');
    }
  };

  // Convert Idea to Live Event
  const handleConvertToEvent = async (ideaId) => {
    try {
      const res = await fetch(`/api/ideas/${ideaId}/convert-to-event`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (res.ok) {
        showToast('Idea successfully converted into a live event!');
        await loadData();
        setActiveTab('events');
      }
    } catch (err) {
      showToast('Error: ' + err.message, 'error');
    }
  };

  // Issue Certificate
  const handleGenerateCertificate = async (eventId, userId, role) => {
    try {
      const res = await fetch('/api/certificates/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId, userId, role })
      });
      if (res.ok) {
        showToast('Cloudinary Certificate generated & verified!');
        loadData();
      }
    } catch (err) {
      showToast('Error: ' + err.message, 'error');
    }
  };

  // Filtered Events
  const filteredEvents = events.filter(e => {
    const matchesCategory = categoryFilter === 'All' || e.category.toLowerCase() === categoryFilter.toLowerCase();
    const matchesLevel = levelFilter === 'All' || (e.level || 'Beginner').toLowerCase() === levelFilter.toLowerCase();
    const matchesSearch = !searchQuery || 
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.tagline?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesLevel && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        users={USERS}
      />

      {/* Toast Notification Banner */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className={`px-4 py-3 rounded-2xl shadow-2xl text-xs font-bold border flex items-center gap-2 ${
            toast.type === 'error'
              ? 'bg-rose-950 border-rose-500 text-rose-200'
              : 'bg-emerald-950 border-emerald-500 text-emerald-200'
          }`}>
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* 1. EVENTS & TICKETING TAB */}
        {activeTab === 'events' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="max-w-2xl relative z-10 space-y-4">
                <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>College Hackathons, Workshops & Cultural Galas</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-outfit">
                  Campus Events, Ticketing & Open Source Challenges
                </h1>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Register for collegiate hackathons with clear pricing tiers and group discounts. Every registration yields an official <strong>Cloudinary Dynamic Admission Ticket</strong> with secure QR verification!
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => setActiveTab('lectures')}
                    className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 transition"
                  >
                    <Video className="w-4 h-4" />
                    Explore Online Lectures
                  </button>
                  <button
                    onClick={() => setActiveTab('collab')}
                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-emerald-300 font-bold text-xs rounded-xl border border-slate-700 flex items-center gap-2 transition"
                  >
                    <Users className="w-4 h-4" />
                    Team Collab Studio
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Bar: Category & Skill Level & Search */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
                {/* Category Pills */}
                <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl">
                  {['All', 'Hackathon', 'Workshop'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                        categoryFilter === cat ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Level-Based Filtering */}
                <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl">
                  <span className="text-[10px] font-bold text-slate-500 px-2 uppercase">Level:</span>
                  {['All', 'Beginner', 'Intermediate', 'Advanced'].map(lvl => (
                    <button
                      key={lvl}
                      onClick={() => setLevelFilter(lvl)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                        levelFilter === lvl ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search input */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search events, agenda, tags..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map(event => {
                const isRegistered = registrations.some(r => r.eventId === event.id);
                return (
                  <EventCard
                    key={event.id}
                    event={event}
                    isRegistered={isRegistered}
                    onSelect={(ev) => setSelectedEvent(ev)}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* 2. ONLINE LECTURES & SHORT COURSES */}
        {activeTab === 'lectures' && (
          <OnlineLectures lectures={lectures} />
        )}

        {/* 3. OPEN SOURCE CONTRIBUTOR HUB */}
        {activeTab === 'opensource' && (
          <OpenSourceHub
            currentUser={currentUser}
            onUpdateProfile={handleUpdateProfile}
            openSourceData={openSourceData}
            leaderboard={leaderboard}
          />
        )}

        {/* 4. TEAMFORGE COLLABORATIVE STUDIO */}
        {activeTab === 'collab' && (
          <TeamForgeCollab
            workspaces={teamWorkspaces}
            onSaveWorkspace={handleSaveWorkspace}
            onMergeWorkspace={handleMergeWorkspace}
          />
        )}

        {/* 5. ERRORLENS AI TUTOR & PLATFORM GUIDE */}
        {activeTab === 'errorlens' && (
          <ErrorLensAssistant setActiveTab={setActiveTab} />
        )}

        {/* 6. IDEA HUB */}
        {activeTab === 'ideas' && (
          <IdeaHub
            ideas={ideas}
            currentUser={currentUser}
            onUpvote={handleUpvote}
            onReview={handleReviewIdea}
            onConvertToEvent={handleConvertToEvent}
            onNewIdea={handleNewIdea}
          />
        )}

        {/* 7. PARTICIPATION VAULT & PASSES */}
        {activeTab === 'participation' && (
          <ParticipationVault
            registrations={registrations}
            certificates={certificates}
            currentUser={currentUser}
            events={events}
            onGenerateCertificate={handleGenerateCertificate}
          />
        )}

        {/* 8. CIRCULAR2ACTION AI NOTICE PARSER */}
        {activeTab === 'circular' && (
          <CircularExtractor
            onEventCreated={loadData}
            setActiveTab={setActiveTab}
          />
        )}

        {/* 9. CLOUDINARY INNOVATION MATRIX */}
        {activeTab === 'cloudinary' && (
          <CloudinaryShowcase />
        )}

        {/* 10. CERTIFICATE VERIFICATION */}
        {activeTab === 'verify' && (
          <CertificateVerifier />
        )}
      </main>

      {/* Event Details & Registration Modal */}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onRegister={handleRegister}
          isRegistered={registrations.some(r => r.eventId === selectedEvent.id)}
          registrationData={registrations.find(r => r.eventId === selectedEvent.id)}
        />
      )}

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-900 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">EventHub AI</span>
            <span>• Hacktober HackDays 2026 Submission</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>50% Problem Statement & Solution</span>
            <span>30% Cloudinary Integration</span>
            <span>20% Notion Documentation</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
