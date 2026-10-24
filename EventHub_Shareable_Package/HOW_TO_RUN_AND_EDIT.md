# 📖 EventHub AI — How to View, Run, and Edit This Project

Welcome to the **EventHub AI** Shareable Distribution Package!  
This package allows anyone—across different Wi-Fi networks and devices—to view the project, run their own private instance, and edit the code freely without affecting the original master project.

---

## 🌐 1. How Anyone on ANY Wi-Fi Can View the Final Live Project (Instant Access)

The live project is actively hosted through a secure global Cloudflare edge tunnel. Anyone on **any mobile device, laptop, or Wi-Fi network worldwide** can open and interact with the full application right now:

👉 **Live URL:** [https://living-accessibility-string-pad.trycloudflare.com](https://living-accessibility-string-pad.trycloudflare.com)

- **No login or password needed.**
- Full access to all events, live lectures, ticket generators, TeamForge collab studio, ErrorLens AI debugger, and Cloudinary dynamic certificate viewers!

---

## 💻 2. How to Run This Project on Your Own Computer (Mac, Windows, Linux)

If you downloaded or received this folder and want to run your own local instance:

### Step 1: Requirements
- Make sure you have **Node.js** (v18 or higher) installed on your computer: [Download Node.js](https://nodejs.org/)

### Step 2: One-Click Startup
- **On Mac / Linux:**  
  Double click or run `./start-project.sh` in Terminal:
  ```bash
  chmod +x start-project.sh
  ./start-project.sh
  ```
- **On Windows:**  
  Double-click `start-project.bat`

### Step 3: Or Run Manually via Terminal
```bash
# 1. Open a terminal inside this folder
cd EventHub_Shareable_Package

# 2. Install backend dependencies (one-time)
npm install

# 3. Start the application
npm start
```

🎉 Open your browser and go to: **`http://localhost:5001`**

---

## ✏️ 3. How to Edit Code Without Changing the Original Project

Every time someone downloads or copies this folder to their computer, **they are working on an isolated local copy**. Any change you make will only affect your own computer:

### If you want to customize features:
1. **To modify events, seed data, or users:**
   - Open `server/data.json` or `server/db.js` and edit the events, ticket tiers, or lectures.
2. **To customize the AI Debugger, Circular parser, or prompts:**
   - Open `server/aiService.js`.
3. **To change Cloudinary certificate / ticket styling:**
   - Open `server/cloudinaryService.js`.
4. **To edit the frontend UI components:**
   - Navigate to `client/src/components/` and modify `EventCard.jsx`, `OnlineLectures.jsx`, `OpenSourceHub.jsx`, `TeamForgeCollab.jsx`, etc.
   - Run `npm run build --prefix client` to compile your new frontend updates!

---

## ☁️ 4. Adding Your Own Cloudinary & Gemini API Keys (Optional)

EventHub is designed to work **100% out of the box** using Cloudinary's dynamic transformation demo cloud and an intelligent built-in fallback AI engine.

If you wish to connect your own personal Cloudinary or Gemini accounts:
1. Open `.env` in this directory.
2. Fill in your credentials:
   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   GEMINI_API_KEY=your_gemini_api_key
   ```
3. Restart the server (`npm start`).

---

## 🚀 5. How to Deploy Your Own Version to the Cloud (Free)

You can deploy this project for free to platforms like **Render**, **Railway**, or **Vercel**:

### Deploying to Render (Free Web Service):
1. Push this folder to your own GitHub repository.
2. Go to [Render.com](https://render.com) -> New Web Service.
3. Select your repository.
4. Set:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
5. Click **Deploy**! You will receive your own live `.onrender.com` URL.

---

## 📁 6. What's Inside This Shareable Package

```
├── NOTION_DOCUMENTATION.md      # Full Notion-ready documentation & pitch notes
├── NOTION_DOCUMENTATION.html    # Double-click to view styled documentation in browser!
├── HOW_TO_RUN_AND_EDIT.md       # This guide
├── start-project.sh             # 1-click startup script for Mac/Linux
├── start-project.bat            # 1-click startup script for Windows
├── package.json                 # Project configuration & start scripts
├── .env                         # Environment configuration
├── server/                      # Complete Express backend & Cloudinary services
│   ├── server.js
│   ├── cloudinaryService.js
│   ├── aiService.js
│   ├── db.js
│   └── data.json
└── client/                      # Complete React frontend source & built assets
    ├── dist/                    # Pre-compiled production build (ready to serve)
    ├── src/                     # Editable React source code
    └── package.json
```
