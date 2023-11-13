const { app, BrowserWindow } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater')

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

autoUpdater.autoDownload = false
autoUpdater.autoInstallOnAppQuit = true
autoUpdater.setFeedURL({
  provider: 'github',
  owner: 'philSism',
  repo: 'electronPlayground',
  private: no,
})

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      devTools: false
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow()

  autoUpdater.checkForUpdates()
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

autoUpdater.on('update-available', () => {
  console.info('update ready')
  // document.getElementById('updateMessage').innerText = 'Update available'
})

autoUpdater.on('update-not-available', () => {
  console.info('no update')
  // document.getElementById('updateMessage').innerText = 'App is fully updated'
})

autoUpdater.on('update-downloaded', () => {
  console.info('update downloaded')
  // document.getElementById('updateMessage').innerText = 'Update download: completed'
})

autoUpdater.on('error', () => {
  console.info('error')
  // document.getElementById('updateMessage').innerText = 'AutoUpdater: ERROR'
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
