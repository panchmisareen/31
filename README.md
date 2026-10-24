# 🎟️ EventHub AI — Campus Events, Idea Incubator, Collab Studio & Dynamic Cloudinary Credentials

> **Hacktober HackDays 2026 Submission**  
> An intelligent full-stack college events platform featuring crowdsourced event proposals, faculty approvals, online lectures & short courses, collaborative developer studios, ErrorLens AI debugging mentorship, and automated edge-rendered Cloudinary tickets & certificates.

---

## 🌟 Highlights & Judging Criteria Alignment

| Judging Criteria | EventHub AI Implementation |
| :--- | :--- |
| **50% Problem Statement & Solution** | • **Circular2Action**: AI transforms messy college notices into live events with deadlines.<br>• **Online Lectures Hub**: Live webinars & on-demand courses (Finance, Cyber, Rust, AI).<br>• **Ticketing & RSVP**: Pricing tiers, promo codes (`HACKTOBER50`), manual & digital ticket passes, FAQ section.<br>• **Open Source Hub**: GitHub/GitLab link, live PR tracker, `good-first-issue` feed, mentors, leaderboard.<br>• **TeamForge Collab Studio**: Simultaneous Frontend, Backend & DB workspace with 1-click merge.<br>• **ErrorLens AI Tutor**: Explains errors pedagogically and teaches fixes without spoon-feeding answers.<br>• **Idea Incubator**: Crowdsourced proposals with AI feasibility & budget scoring + faculty approval pipeline. |
| **30% Cloudinary Integration** | • **Dynamic Certificates**: Edge multi-layer text overlays (`l_text`, `co_rgb`, `g_north`, `g_south`) with zero server overhead.<br>• **Dynamic Admission Tickets**: Real-time tickets with barcodes, seat tiers, and check-in QR codes.<br>• **Milestone Badges**: Dynamic open-source achievement badges (`First PR Merged`, `Git Master`).<br>• **Smart Content-Aware Cropping (`g_auto`)**: Adapts event banners to 16:9, 4:3, and 9:16 aspect ratios.<br>• **Adaptive Video Streaming**: Smooth playback for online lectures (`vc_auto,q_auto,w_1280`). |
| **20% Notion Documentation** | Comprehensive documentation ready to copy into Notion in [`NOTION_DOCUMENTATION.md`](./NOTION_DOCUMENTATION.md). |

---

## ⚡ Quickstart

### 1. Install & Build
```bash
# Install root backend dependencies
npm install

# Build client frontend
npm run build
```

### 2. Start the Server
```bash
npm start
```
Open **`http://localhost:5001`** in your browser!

### 3. Development Mode (Optional)
```bash
# Terminal 1: Backend API
npm run server

# Terminal 2: Vite React Frontend (Hot-Reload)
npm run client
```
Open **`http://localhost:3000`** (Vite proxies all API requests to port `5001`).

---

## ⚙️ Environment Variables (`.env`)

```env
PORT=5001

# Cloudinary Integration (30% Evaluation Criteria)
# Replace with your Cloudinary credentials from https://cloudinary.com/console
# If left as 'demo', EventHub uses Cloudinary's dynamic transformation demo cloud!
CLOUDINARY_CLOUD_NAME=demo
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# LLM Configuration (Optional: Gemini or OpenAI)
# If left blank, EventHub uses its built-in intelligent offline AI parser
GEMINI_API_KEY=
OPENAI_API_KEY=
```

---

## 📂 Project Structure

```
├── client/                      # React 18 + Vite + Tailwind CSS Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx               # Navigation & 1-click Role Switcher
│   │   │   ├── EventCard.jsx            # Event card with Cloudinary preview & level tag
│   │   │   ├── EventDetailModal.jsx     # Ticketing tiers, promo codes, agenda & FAQ
│   │   │   ├── OnlineLectures.jsx       # Live webinars & On-Demand short courses (Finance, Cyber, Rust)
│   │   │   ├── OpenSourceHub.jsx        # GitHub links, PR tracker, Good First Issues, Mentors, Leaderboard
│   │   │   ├── TeamForgeCollab.jsx      # Simultaneous Frontend, Backend, DB & Merge Studio
│   │   │   ├── ErrorLensAssistant.jsx   # AI error debugging mentor & platform guide
│   │   │   ├── IdeaHub.jsx              # Crowdsourced proposals & faculty pipeline
│   │   │   ├── SubmitIdeaModal.jsx      # AI Co-Pilot idea polisher & feasibility scorer
│   │   │   ├── ParticipationVault.jsx   # Student history, passes & certificate gallery
│   │   │   ├── CertificateModal.jsx     # High-res certificate & Cloudinary URL inspector
│   │   │   ├── CircularExtractor.jsx    # Circular2Action notice parser
│   │   │   ├── CloudinaryShowcase.jsx   # Interactive Cloudinary transformation playground
│   │   │   └── CertificateVerifier.jsx  # Public credential verification portal
│   │   ├── App.jsx
│   │   └── main.jsx
├── server/                      # Node.js + Express Backend
│   ├── aiService.js             # Circular2Action, ErrorLens AI Tutor & Feasibility Scorer
│   ├── cloudinaryService.js     # Cloudinary dynamic text overlay, ticket, badge & video builders
│   ├── db.js                    # Persistent state store with rich seed data
│   ├── data.json                # JSON database
│   └── server.js                # Express REST API routes
├── NOTION_DOCUMENTATION.md      # Notion-ready documentation (20% evaluation criteria)
├── package.json
└── README.md
```
