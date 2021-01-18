// Modules to control application life and create native browser window
const {app, ipcMain, BrowserWindow} = require('electron')
const path = require('path')
const { takeHeapSnapshot } = require('process')
const packageJSON = require('./package.json')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      allowRunningInsecureContent: false,
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
      sandbox: true,
    },
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on("toMain", (event, args) => {
  setTimeout(function() {
    // Send result back to renderer process
    mainWindow.webContents.send("fromMain", "data from main")
  }, 1000)
});

ipcMain.handle('get-version', (event) => {
  return packageJSON.version
})

ipcMain.handle('set-fullscreen', (event, arg) => {

})

async function awaitableProcess() {
  await new Promise(r => setTimeout(r, 1000));
}

ipcMain.handle('an-action', async (event, arg) => {
    // do stuff
    await awaitableProcess();
    return "foo";
})

