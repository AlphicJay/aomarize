# 🌐 Aomarize — Regional AI News Glassmorphism Desktop App

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Electron](https://img.shields.io/badge/Electron-31.3.0-47848F?logo=electron)](https://www.electronjs.org/)
[![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-brightgreen)](#cross-platform-builds)
[![UI](https://img.shields.io/badge/Design-Glassmorphism%20Dark-purple)](#-glassmorphism-design)

> **Aomarize** is an open-source, cross-platform desktop application designed for tracking real-time artificial intelligence news, breakthroughs, policy accords, and hardware advancements across **four key global regions**: 🇺🇸 **United States**, 🇬🇧 **United Kingdom**, 🌏 **Asia**, and 🌍 **Africa**.

Built with a state-of-the-art **Glassmorphic interface**, backdrop blur, ambient neon glows, continuous breaking tickers, AI key takeaways, and an integrated **Text-to-Speech (TTS) audio reader**.

---

## ✨ Features

- 🌐 **4 Specific Global AI Regions**:
  - 🇺🇸 **United States**: Silicon Valley frontier models (OpenAI, Anthropic, Google DeepMind), US AI Safety Institute evaluations, and NVIDIA compute silicon.
  - 🇬🇧 **United Kingdom**: London AI Hub, £100M UK AISI benchmark suites, Oxford/Cambridge research, and European policy.
  - 🌏 **Asia**: TSMC 1.4nm (A14) semiconductor nodes, East Asian humanoid robotics, China AI breakthroughs, and Singapore ASEAN SeaLion LLMs.
  - 🌍 **Africa**: Lelapa AI & Masakhane multilingual NLP (25+ indigenous African languages), Kenyan Agri-Tech computer vision, and Kigali AU AI Ethics Accords.
- 💎 **Ultra-Premium Glassmorphism UI**:
  - Custom frameless drag window with native window controls (minimize, maximize, close).
  - Multi-layer frosted glass cards (`backdrop-filter: blur(28px)`), neon cyan/violet glowing borders, and animated background mesh orbs.
- ⚡ **Breaking AI News Ticker**: Continuous horizontal marquee displaying real-time regional headlines.
- 🤖 **AI Key Takeaways & Glass Reader**: Slide-over reader modal summarizing top 3 bullet points for rapid scanning.
- 🎧 **Built-in Audio Reader (TTS)**: Listen to full AI news stories aloud powered by native Web Speech Synthesis.
- 🏷️ **Topic & Category Filtering**: Instantly filter by *LLMs & GenAI*, *Chips & Hardware*, *Policy & Ethics*, *Startups & VC*, or *Research & Science*.
- 🔍 **Real-Time Instant Search**: Live fuzzy search by keywords, region names, or source publishers.
- ★ **Bookmarks & Offline Caching**: Save favorite articles locally with persistent `localStorage` support.
- 📊 **Regional Activity Heat Index**: Live sidebar metrics widget comparing regional AI coverage volume.

---

## 📸 Application Preview

- **Global View**: Multi-region grid displaying color-coded regional tags.
- **Frameless Window**: Native translucency (`vibrancy` on macOS, `acrylic` on Windows).
- **Reader & Audio Mode**: Full article view with key bullet points and voice playback controls.

---

## 🚀 Quickstart & Installation

### Prerequisites

Ensure you have **Node.js** (v18.0.0 or higher) and **npm** installed on your system.

```bash
node -v
npm -v
```

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/aomarize.git
   cd aomarize
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Launch the desktop app**:
   ```bash
   npm start
   ```

---

## 📦 Building for Production

Package Aomarize as a native standalone desktop executable for **Windows**, **macOS**, or **Linux**:

```bash
# Package for your current operating system
npm run dist

# Package for development testing
npm run pack
```

### Supported Target Packages:
- **Windows**: `.exe` installer (NSIS) or standalone zip
- **macOS**: `.dmg` disk image or `.app` bundle
- **Linux**: `.AppImage` or `.deb` package

---

## ⌨️ Keyboard Shortcuts & Controls

| Shortcut | Action |
| :--- | :--- |
| `Esc` | Close Glass Reader Modal |
| `Click Ticker Item` | Instantly open story in Reader View |
| `Click Card` | Expand article & AI Key Takeaways |
| `★ Button` | Toggle article bookmark |
| `▶️ Button` | Play / Pause Text-to-Speech audio reader |

---

## 📁 Project Architecture

```
aomarize/
├── package.json               # Manifest & build configuration
├── main.js                    # Electron main process & frameless window manager
├── preload.js                 # Secure IPC contextBridge & native desktop hooks
├── index.html                 # Main Glassmorphism application markup shell
├── styles/
│   └── glassmorphism.css      # Core design system, backdrop blur & neon glow styles
├── src/
│   ├── newsData.js            # Regional news data aggregator (US, UK, Asia, Africa)
│   └── app.js                 # Renderer logic, feed filters, search & TTS engine
└── README.md                  # Open-source documentation
```

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<p center>Crafted with 🩵 for the Global AI Community</p>
