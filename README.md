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

## 💾 Downloads & Instant Installation

Download the latest official release of Aomarize for your operating system:

<div align="center">

[![Download for macOS](https://img.shields.io/badge/Download-macOS%20(.dmg)-000000?style=for-the-badge&logo=apple&logoColor=white)](https://github.com/AlphicJay/aomarize/releases/latest/download/Aomarize-1.0.0-arm64.dmg)
[![Download for Windows](https://img.shields.io/badge/Download-Windows%20(.exe)-0078D6?style=for-the-badge&logo=windows&logoColor=white)](https://github.com/AlphicJay/aomarize/releases/latest/download/Aomarize.Setup.1.0.0.exe)
[![Download for Linux](https://img.shields.io/badge/Download-Linux%20(.AppImage)-FCC624?style=for-the-badge&logo=linux&logoColor=black)](https://github.com/AlphicJay/aomarize/releases/latest/download/Aomarize-1.0.0-arm64.AppImage)

[![All Releases](https://img.shields.io/badge/View_All_Downloads-GitHub_Releases-2ea44f?style=for-the-badge&logo=github)](https://github.com/AlphicJay/aomarize/releases/latest)

</div>

### 📥 Direct Download Links

| Operating System | Primary Download (Click to Download) | Alternative Portable / Archive Format |
| :--- | :--- | :--- |
| 🍏 **macOS** (Apple Silicon & Intel) | [**⬇️ Download `Aomarize-1.0.0-arm64.dmg`**](https://github.com/AlphicJay/aomarize/releases/latest/download/Aomarize-1.0.0-arm64.dmg)<br>*(or [Local repo file](./dist/Aomarize-1.0.0-arm64.dmg))* | [⬇️ `Aomarize-1.0.0-arm64-mac.zip`](https://github.com/AlphicJay/aomarize/releases/latest/download/Aomarize-1.0.0-arm64-mac.zip) *(or [Local](./dist/Aomarize-1.0.0-arm64-mac.zip))* |
| 🪟 **Windows** (10 / 11 64-bit) | [**⬇️ Download `Aomarize Setup 1.0.0.exe` (Installer)**](https://github.com/AlphicJay/aomarize/releases/latest/download/Aomarize.Setup.1.0.0.exe)<br>*(or [Local repo file](./dist/Aomarize%20Setup%201.0.0.exe))* | [⬇️ `Aomarize 1.0.0.exe` (Portable)](https://github.com/AlphicJay/aomarize/releases/latest/download/Aomarize.1.0.0.exe) • [⬇️ `.zip`](https://github.com/AlphicJay/aomarize/releases/latest/download/Aomarize-1.0.0-arm64-win.zip) *(or [Local](./dist/Aomarize-1.0.0-arm64-win.zip))* |
| 🐧 **Linux** (Ubuntu, Debian, Fedora, Arch) | [**⬇️ Download `Aomarize-1.0.0-arm64.AppImage`**](https://github.com/AlphicJay/aomarize/releases/latest/download/Aomarize-1.0.0-arm64.AppImage)<br>*(or [Local repo file](./dist/Aomarize-1.0.0-arm64.AppImage))* | [⬇️ `aomarize_1.0.0_arm64.deb`](https://github.com/AlphicJay/aomarize/releases/latest/download/aomarize_1.0.0_arm64.deb) • [⬇️ `.tar.gz`](https://github.com/AlphicJay/aomarize/releases/latest/download/aomarize-1.0.0-arm64.tar.gz) *(or [Local](./dist/aomarize_1.0.0_arm64.deb))* |

---

### 💻 Installation Guides

#### 🍏 macOS Installation
1. Click the [**Download macOS (.dmg)**](https://github.com/AlphicJay/aomarize/releases/latest/download/Aomarize-1.0.0-arm64.dmg) link above.
2. Open the downloaded `.dmg` file and drag **Aomarize** into your `/Applications` folder.
3. Open Aomarize from Spotlight or Launchpad.

#### 🪟 Windows Installation
1. Click the [**Download Windows (.exe)**](https://github.com/AlphicJay/aomarize/releases/latest/download/Aomarize.Setup.1.0.0.exe) link above.
2. Run the installer (or use the [Portable `.exe`](https://github.com/AlphicJay/aomarize/releases/latest/download/Aomarize.1.0.0.exe) for zero-install instant execution).
3. The app creates a desktop and Start Menu shortcut automatically.

#### 🐧 Linux Installation
- **AppImage (Recommended)**:
  ```bash
  # Make executable and run
  chmod +x Aomarize-1.0.0-arm64.AppImage
  ./Aomarize-1.0.0-arm64.AppImage
  ```
- **Debian / Ubuntu (.deb)**:
  ```bash
  sudo dpkg -i aomarize_1.0.0_arm64.deb
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
