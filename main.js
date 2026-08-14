const { app, BrowserWindow, ipcMain, Notification, shell } = require('electron');
const path = require('path');

if (process.platform === 'darwin') {
  app.dock.setIcon(path.join(__dirname, 'assets/icon.png'));
}

let mainWindow;

function createWindow() {
  const isMac = process.platform === 'darwin';
  const isWin = process.platform === 'win32';

  mainWindow = new BrowserWindow({
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
  if (lower.match(/chip|nvidia|intel|amd|semiconductor|hardware|gpu|processor/)) return 'Chips & Hardware';
  if (lower.match(/policy|ethics|regulation|law|government|safety|aisi|congress|eu|act/)) return 'Policy & Ethics';
  if (lower.match(/startup|vc|funding|raise|venture|capital|series|valuation/)) return 'Startups & VC';
  if (lower.match(/research|science|discovery|quantum|physics|paper|study|university|deepmind|lab/)) return 'Research & Science';
  return 'LLMs & GenAI';
}

async function fetchGoogleNews(region) {
  let query = 'AI news';
  let hl = 'en-US';
  let gl = 'US';
  let ceid = 'US:en';

  if (region === 'uk') {
    query = 'AI news UK';
    hl = 'en-GB';
    gl = 'GB';
    ceid = 'GB:en';
  } else if (region === 'asia') {
    query = 'AI news Asia';
  } else if (region === 'africa') {
    query = 'AI news Africa';
  } else if (region === 'us') {
    query = 'AI news US';
  }
  
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=${hl}&gl=${gl}&ceid=${ceid}`;
  
  try {
    const feed = await parser.parseURL(url);
    return feed.items.map((item, index) => {
      let snippet = item.contentSnippet || item.description || '';
      snippet = snippet.replace(/<[^>]+>/g, '').trim();
      if (snippet.length > 250) snippet = snippet.substring(0, 247) + '...';
      
      let imageUrl = null;
      if (item['media:content'] && item['media:content']['$'] && item['media:content']['$'].url) {
         imageUrl = item['media:content']['$'].url;
      }
      
      // Match the format expected by the frontend
      let regionTag = region === 'all' ? 'global' : region;
      let regionName = regionTag.charAt(0).toUpperCase() + regionTag.slice(1);
      if (regionTag === 'us') regionName = 'United States';
      if (regionTag === 'uk') regionName = 'United Kingdom';
      if (regionTag === 'global') regionName = 'Global';

      return {
        id: `${regionTag}-${index}`,
        region: regionTag,
        regionName: regionName,
        flag: regionTag === 'us' ? '🇺🇸' : regionTag === 'uk' ? '🇬🇧' : regionTag === 'asia' ? '🌏' : regionTag === 'africa' ? '🌍' : '🌐',
        title: item.title,
        snippet: snippet,
        fullText: snippet + '\\n\\n(Full text unavailable from RSS feed. Please read the original article.)',
        keyTakeaways: ['Extracted from Google News RSS.', 'Live automated feed.'],
        source: item.source || item.creator || 'Google News',
        url: item.link,
        category: determineCategory(item.title + ' ' + snippet),
        date: item.pubDate || new Date().toISOString(),
        readTime: 'Article',
        sentiment: 'News',
        imageUrl: imageUrl
      };
    }).slice(0, 15);
  } catch (err) {
    console.error('Error fetching RSS:', err);
    throw err;
  }
}

ipcMain.handle('fetch-news', async (_event, region) => {
  return await fetchGoogleNews(region);
});

ipcMain.on('open-external', (_event, url) => {
  shell.openExternal(url);
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
