// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})

//import {ipcRenderer, contextBridge} from "electron"
const {ipcRenderer, contextBridge} = require('electron')

contextBridge.exposeInMainWorld("app", {
  setFullscreen: (flag) => ipcRenderer.invoke("setFullscreen", flag),

  anAction: (async () => {
    const result = await ipcRenderer.invoke('an-action', [1, 2, 3]);
    return result;
  }),

})

// Adds an object 'api' to the global window object:
contextBridge.exposeInMainWorld('api', {
    doAction: async (arg) => {
        return await ipcRenderer.invoke('an-action', arg);
    }
})
