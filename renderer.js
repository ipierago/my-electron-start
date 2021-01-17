// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
(async () => {
    const response = await window.api.doAction([1,2,3]);
    console.log(response); // we now have the response from the main thread without exposing
                           // ipcRenderer, leaving the app less vulnerable to attack    
})();
