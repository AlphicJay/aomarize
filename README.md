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
- 🏷️ **Topic & Category Filtering**: Instantly filter by *LLMs & GenAI*, *Chips & Hardware*, *AI Regulations*, *Startups & VC*, or *AI Health / Medicines*.
- 🔍 **Real-Time Instant Search**: Live fuzzy search by keywords, region names, or source publishers.
- ★ **Bookmarks & Offline Caching**: Save favorite articles locally with persistent `localStorage` support.
- 📊 **Regional Activity Heat Index**: Live sidebar metrics widget comparing regional AI coverage volume across United States, United Kingdom, East Asia, and Africa.

---

## 💾 Downloads & Operating System Support

Aomarize runs natively across **macOS**, **Windows**, and **Linux**. Pre-built binaries are located in the `dist/` directory or can be generated using the build commands below:

| Operating System | Recommended Download Package | Alternative Format |
| :--- | :--- | :--- |
| 🍏 **macOS** (Apple Silicon & Intel) | **`Aomarize-1.0.0-arm64.dmg`** / **`Aomarize-1.0.0.dmg`** | `Aomarize-1.0.0-mac.zip` |
| 🪟 **Windows** (10 / 11 64-bit) | **`Aomarize Setup 1.0.0.exe`** (Installer) | `Aomarize 1.0.0.exe` (Portable) / `.zip` |
| 🐧 **Linux** (Ubuntu, Debian, Fedora, Arch) | **`Aomarize-1.0.0.AppImage`** (Universal) | `Aomarize_1.0.0_amd64.deb` / `.tar.gz` |

### 🍏 macOS Installation
1. Open the downloaded `.dmg` file.
2. Drag and drop **Aomarize** into your `/Applications` folder.
3. Launch from Spotlight or Launchpad.

### 🪟 Windows Installation
1. Run `Aomarize Setup 1.0.0.exe` to install, or double-click `Aomarize Portable.exe` for zero-install instant execution.
2. A desktop and Start Menu shortcut will be created automatically.

### 🐧 Linux Installation
- **AppImage**:
  ```bash
  chmod +x Aomarize-1.0.0.AppImage
  ./Aomarize-1.0.0.AppImage
  ```
- **Debian / Ubuntu (.deb)**:
  ```bash
  sudo dpkg -i Aomarize_1.0.0_amd64.deb
  ```

---

## 📦 Building for Production

To build standalone distributable binaries for your operating system:

```bash
# Build for macOS (.dmg, .zip)
npm run build:mac

# Build for Windows (.exe installer, portable, .zip)
npm run build:win

# Build for Linux (.AppImage, .deb, .tar.gz)
npm run build:linux

# Build all target platforms simultaneously
npm run build:all
```

All compiled binaries will be output directly to the `./dist/` directory.

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
