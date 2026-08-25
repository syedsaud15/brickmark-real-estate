# 🏡 BrickMark — Premium Real Estate Platform

<p align="center">
<svg width="100%" viewBox="0 0 1200 280" xmlns="http://www.w3.org/2000/svg">

  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#081126"/>
      <stop offset="55%" stop-color="#1E3A8A"/>
      <stop offset="100%" stop-color="#0F766E"/>
    </linearGradient>

    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FDE68A"/>
      <stop offset="100%" stop-color="#F59E0B"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="280" rx="18" fill="url(#bg)"/>

  <path d="M0 210 C180 185,320 235,520 205 S900 180,1200 225 L1200 280 L0 280 Z"
        fill="#FFFFFF" opacity="0.08"/>

  <g transform="translate(70,55)">
    <path d="M40 130 L90 30 L140 130" stroke="url(#gold)" stroke-width="8" fill="none" stroke-linecap="round"/>
    <path d="M58 130 V55 M90 130 V18 M122 130 V75" stroke="url(#gold)" stroke-width="8" stroke-linecap="round"/>
    <rect x="76" y="108" width="28" height="22" rx="3" fill="url(#gold)"/>
  </g>

  <g transform="translate(720,45)" fill="#FBBF24" opacity="0.95">
    <rect x="0" y="95" width="24" height="95"/>
    <rect x="35" y="55" width="26" height="135"/>
    <rect x="72" y="18" width="28" height="172"/>
    <rect x="112" y="70" width="24" height="120"/>
    <rect x="148" y="38" width="30" height="152"/>
    <rect x="192" y="88" width="24" height="102"/>
    <rect x="228" y="30" width="30" height="160"/>
    <rect x="272" y="60" width="24" height="130"/>
    <rect x="308" y="12" width="32" height="178"/>
  </g>

  <text x="210" y="88" font-family="Segoe UI,Arial" font-size="50" font-weight="700" fill="#FFFFFF">
    BRICK<tspan fill="#FBBF24">MARK</tspan>
  </text>

  <text x="210" y="122" font-family="Segoe UI,Arial" font-size="20" fill="#E5E7EB" letter-spacing="2">
    PREMIUM REAL ESTATE PLATFORM
  </text>

  <line x1="210" y1="145" x2="610" y2="145" stroke="#FBBF24" opacity="0.5"/>

  <text x="210" y="170" font-family="Segoe UI,Arial" font-size="18" fill="#FCD34D" letter-spacing="2">
    DISCOVER • EXPLORE • OWN
  </text>

  <g transform="translate(210,195)" font-family="Segoe UI,Arial" font-size="14" fill="#E5E7EB">
    <text x="0" y="0">✓ Verified Properties</text>
    <text x="185" y="0">◆ Buy & Rent</text>
    <text x="330" y="0">★ Premium UI</text>
  </g>

</svg>
</p>

<p align="center">
  <b>Modern Property Discovery • Python • SQLite • Vercel • Render</b>
</p>

<p align="center">
  A luxury real estate platform for discovering verified properties across Mumbai & Bangalore.
</p>

<p align="center">
  <a href="https://brickmark.vercel.app">
    <img src="https://img.shields.io/badge/🌐_LIVE_DEMO-111827?style=for-the-badge" />
  </a>
  <a href="https://github.com/syedsaud15/brickmark-real-estate">
    <img src="https://img.shields.io/badge/GITHUB-181717?style=for-the-badge&logo=github" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/PYTHON-3776AB?style=flat-square&logo=python&logoColor=white"/>
  <img src="https://img.shields.io/badge/SQLITE-003B57?style=flat-square&logo=sqlite&logoColor=white"/>
  <img src="https://img.shields.io/badge/HTML-E34F26?style=flat-square&logo=html5&logoColor=white"/>
  <img src="https://img.shields.io/badge/CSS-1572B6?style=flat-square&logo=css3&logoColor=white"/>
  <img src="https://img.shields.io/badge/JAVASCRIPT-F7DF1E?style=flat-square&logo=javascript&logoColor=black"/>
  <img src="https://img.shields.io/badge/RENDER-46E3B7?style=flat-square"/>
  <img src="https://img.shields.io/badge/VERCEL-000000?style=flat-square&logo=vercel"/>
</p>

---

# 📖 Overview

**BrickMark** is a premium real estate discovery platform designed to deliver a modern, responsive and elegant property browsing experience.

Users can explore verified residential properties, browse listings across **Mumbai** and **Bangalore**, switch between **Buy & Rent** categories and access detailed property information through a clean luxury interface.

---

# ✨ Core Features

| Feature | Description |
|:--|:--|
| 🛡 **Verified Listings** | Browse premium verified residential properties |
| 🏙 **City Based Search** | Explore properties across Mumbai & Bangalore |
| 🏠 **Buy & Rent** | Seamlessly switch between property categories |
| 📱 **Responsive Design** | Optimized for desktop, tablet & mobile |
| ⚡ **Fast Experience** | Lightweight single-page architecture |
| 🌐 **Production Ready** | Deployed using Vercel & Render |

---

# 🛠 Tech Stack

| Layer | Technology |
|:--|:--|
| **Frontend** | HTML · CSS · JavaScript |
| **Backend** | Python |
| **Database** | SQLite |
| **API** | REST |
| **Deployment** | Vercel + Render |
| **Version Control** | Git & GitHub |

---

# 🏗 System Architecture

```text
                   User Browser
                        │
                        ▼
         Frontend (Vercel Static Website)
                        │
                 REST API Requests
                        │
                        ▼
        Backend (Render Python Server)
                        │
                        ▼
         SQLite Properties Database
```

---

# 📂 Project Structure

```text
brickmark-real-estate/
│
├── frontend/
│   ├── index.html
│   ├── public/
│   └── vercel.json
│
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── properties.db
│   └── routers/
│
├── .gitignore
└── README.md
```

---

# 🚀 Getting Started

### Clone Repository

```bash
git clone https://github.com/syedsaud15/brickmark-real-estate.git
cd brickmark-real-estate
```

### Run Backend

```bash
cd backend
python main.py
```

### Open Frontend

```text
frontend/index.html
```

---

# 🌍 Live Deployment

| Service | Status |
|:--|:--|
| 🌐 Frontend | **Vercel** |
| ⚙ Backend | **Render** |
| 🗄 Database | **SQLite** |

**Live Website:** https://brickmark.vercel.app

---

# 📊 Project Highlights

- Premium Dark Luxury Interface
- Verified Property Listings
- Buy & Rent Categories
- Mumbai & Bangalore Discovery
- Responsive Design
- SQLite Powered Backend
- Production Deployment Workflow

---

# 👨‍💻 Developer

<p align="center">

## **Syed Saud Alam**

Data Engineer • Frontend Developer

<a href="https://linkedin.com/in/syed-saud-dev">
  <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white"/>
</a>
<a href="https://github.com/syedsaud15">
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github"/>
</a>

</p>

---

<p align="center">
  ⭐ If you found this project useful, consider giving it a Star.
</p>
