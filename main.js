const { app, BrowserWindow, ipcMain, Notification, shell, Menu } = require('electron');
const path = require('path');

app.name = 'Aomarize';
if (app.setName) {
  app.setName('Aomarize');
}

if (process.platform === 'darwin') {
  app.dock.setIcon(path.join(__dirname, 'assets/icon.png'));
}

let mainWindow;

function createWindow() {
  const isMac = process.platform === 'darwin';
  const isWin = process.platform === 'win32';

  mainWindow = new BrowserWindow({
    title: 'Aomarize',
    width: 1320,
    height: 860,
    minWidth: 960,
    minHeight: 680,
    frame: false,
    transparent: true,
    backgroundColor: '#00000000',
    titleBarStyle: isMac ? 'hiddenInset' : 'hidden',
    vibrancy: isMac ? 'under-window' : undefined,
    visualEffectState: isMac ? 'active' : undefined,
    backgroundMaterial: isWin ? 'acrylic' : undefined,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    },
    show: false,
    icon: path.join(__dirname, 'assets/icon.png')
  });

  mainWindow.loadFile('index.html');

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('window-maximized-state', true);
  });

  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('window-maximized-state', false);
  });
}

// Window IPC Handlers
ipcMain.on('window-minimize', () => {
  if (mainWindow) mainWindow.minimize();
});

ipcMain.on('window-maximize', () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }
});

ipcMain.on('window-close', () => {
  if (mainWindow) mainWindow.close();
});

ipcMain.handle('window-is-maximized', () => {
  return mainWindow ? mainWindow.isMaximized() : false;
});

ipcMain.on('notify', (_event, { title, body }) => {
  if (Notification.isSupported()) {
    new Notification({ title: title || 'Aomarize AI News', body }).show();
  }
});

const Parser = require('rss-parser');
const parser = new Parser({
  customFields: {
    item: ['media:content', 'description']
  }
});

function determineCategory(text) {
  const lower = text.toLowerCase();
  if (lower.match(/health|medicin|medical|biotech|cancer|clinical|drug|pharma|protein|biology|hospital|patient|genomic|diagnostic|disease|healthcare/)) return 'AI Health / Medicines';
  if (lower.match(/policy|ethics|regulation|law|government|safety|aisi|congress|eu|act|ban|antitrust|copyright|compliance|governance/)) return 'AI Regulations';
  if (lower.match(/chip|nvidia|intel|amd|semiconductor|hardware|gpu|processor|silicon|datacenter/)) return 'Chips & Hardware';
  if (lower.match(/startup|vc|funding|raise|venture|capital|series|valuation|investment/)) return 'Startups & VC';
  return 'LLMs & GenAI';
}

const REGION_QUERIES = {
  us: {
    hl: 'en-US',
    gl: 'US',
    ceid: 'US:en',
    queries: [
      'Artificial Intelligence United States news',
      'OpenAI OR Anthropic OR "Google DeepMind" OR NVIDIA',
      'Silicon Valley AI startups venture capital funding',
      'AI healthcare medicine drug discovery biotechnology oncology',
      'LLM Machine Learning frontier model research',
      'AI semiconductor chips GPU Blackwell datacenter',
      'AI Safety Institute NIST policy regulation AI Act legislation',
      'Generative AI enterprise software automation',
      'Autonomous AI agents robotics humanoid'
    ]
  },
  uk: {
    hl: 'en-GB',
    gl: 'GB',
    ceid: 'GB:en',
    queries: [
      'Artificial Intelligence United Kingdom news',
      'UK AI Safety Institute London frontier models policy regulation',
      'DeepMind London Cambridge Oxford AI medicine drug discovery biology',
      'UK AI tech startups fintech investment London',
      'Britain AI governance policy regulation science standards',
      'European AI compute infrastructure chips supercomputer',
      'UK healthcare biotech NHS Artificial Intelligence medicine',
      'London artificial intelligence conference summit innovation'
    ]
  },
  asia: {
    hl: 'en-US',
    gl: 'US',
    ceid: 'US:en',
    queries: [
      'Artificial Intelligence Asia tech news',
      'TSMC semiconductor AI chips hardware Taiwan',
      'Japan robotics humanoid AI healthcare automation',
      'Singapore ASEAN AI SeaLion LLM healthcare governance',
      'South Korea Samsung SK Hynix HBM AI memory chips biotech',
      'China AI foundation models DeepSeek Baidu Alibaba Tencent',
      'India AI startups technology developers talent compute healthcare',
      'East Asia AI regulation policy quantum computing'
    ]
  },
  africa: {
    hl: 'en-US',
    gl: 'US',
    ceid: 'US:en',
    queries: [
      'Artificial Intelligence Africa technology innovation',
      'African AI startups tech funding venture capital',
      'Healthcare telemedicine diagnostic AI Africa medicine health',
      'Masakhane Lelapa AI African indigenous languages NLP',
      'Nigeria Kenya South Africa Artificial Intelligence fintech',
      'Rwanda Kigali African Union AI policy governance regulation',
      'Agritech AI satellite drone agriculture Africa farming',
      'African youth digital skills AI education hub'
    ]
  }
};

async function fetchGoogleNews(region) {
  const regionsToFetch = (region === 'all') ? ['us', 'uk', 'asia', 'africa'] : [region];
  const allArticles = [];
  const seenUrls = new Set();
  const seenTitles = new Set();

  for (const r of regionsToFetch) {
    const config = REGION_QUERIES[r] || REGION_QUERIES.us;
    const regionTag = r;
    const regionName = regionTag === 'us' ? 'United States' :
                       regionTag === 'uk' ? 'United Kingdom' :
                       regionTag === 'asia' ? 'Asia' :
                       regionTag === 'africa' ? 'Africa' : 'Global';
    const flag = regionTag === 'us' ? '🇺🇸' :
                 regionTag === 'uk' ? '🇬🇧' :
                 regionTag === 'asia' ? '🌏' :
                 regionTag === 'africa' ? '🌍' : '🌐';

    const promises = config.queries.map(async (query) => {
      const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=${config.hl}&gl=${config.gl}&ceid=${config.ceid}`;
      try {
        const feed = await parser.parseURL(url);
        return feed.items || [];
      } catch (err) {
        return [];
      }
    });

    const settled = await Promise.allSettled(promises);
    for (const res of settled) {
      if (res.status === 'fulfilled' && Array.isArray(res.value)) {
        for (const item of res.value) {
          if (!item || !item.link || !item.title) continue;
          
          const cleanTitle = item.title.trim();
          const cleanUrl = item.link.trim();
          
          // Deduplicate by URL and normalized title
          const titleKey = cleanTitle.toLowerCase().replace(/[^a-z0-9]/g, '');
          if (seenUrls.has(cleanUrl) || seenTitles.has(titleKey)) continue;
          seenUrls.add(cleanUrl);
          seenTitles.add(titleKey);

          let snippet = item.contentSnippet || item.description || '';
          snippet = snippet.replace(/<[^>]+>/g, '').trim();
          if (snippet.length > 250) snippet = snippet.substring(0, 247) + '...';

          let imageUrl = null;
          if (item['media:content'] && item['media:content']['$'] && item['media:content']['$'].url) {
            imageUrl = item['media:content']['$'].url;
          }

          allArticles.push({
            id: `${regionTag}-${allArticles.length + 1}`,
            region: regionTag,
            regionName: regionName,
            flag: flag,
            title: cleanTitle,
            snippet: snippet || cleanTitle,
            fullText: snippet ? `${snippet}\\n\\n(Full text available at original publisher source.)` : `${cleanTitle}\\n\\n(Click to read full article at original publisher source.)`,
            keyTakeaways: ['Real-time regional intelligence feed.', 'Sourced from verified publications.'],
            source: item.source || item.creator || 'Google News',
            url: cleanUrl,
            category: determineCategory(cleanTitle + ' ' + snippet),
            date: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(),
            readTime: '3 min read',
            sentiment: 'Active Feed',
            imageUrl: imageUrl
          });
        }
      }
    }
  }

  // Sort descending by date
  allArticles.sort((a, b) => new Date(b.date) - new Date(a.date));

  return allArticles;
}

ipcMain.handle('fetch-news', async (_event, region) => {
  return await fetchGoogleNews(region);
});

ipcMain.on('open-external', (_event, url) => {
  shell.openExternal(url);
});

app.whenReady().then(() => {
  const isMac = process.platform === 'darwin';
  const menuTemplate = [
    ...(isMac ? [{
      label: 'Aomarize',
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    }] : []),
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        ...(isMac ? [{ role: 'selectAll' }] : [])
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        ...(isMac ? [
          { type: 'separator' },
          { role: 'front' },
          { type: 'separator' },
          { role: 'window' }
        ] : [
          { role: 'close' }
        ])
      ]
    }
  ];

  const appMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(appMenu);

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

