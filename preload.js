const { contextBridge, ipcRenderer, shell } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Window Controls
  minimize: () => ipcRenderer.send('window-minimize'),
  maximize: () => ipcRenderer.send('window-maximize'),
  close: () => ipcRenderer.send('window-close'),
  isMaximized: () => ipcRenderer.invoke('window-is-maximized'),
  
  // Platform & Environment
  platform: process.platform, // 'darwin', 'win32', 'linux'
  
  // System actions
  openExternal: (url) => shell.openExternal(url),
  sendNotification: (title, body) => ipcRenderer.send('notify', { title, body }),
  fetchNews: (region) => ipcRenderer.invoke('fetch-news', region),
  
  // Feed & IPC Utilities
  onWindowMaximizeToggle: (callback) => ipcRenderer.on('window-maximized-state', (_event, isMaximized) => callback(isMaximized))
});
