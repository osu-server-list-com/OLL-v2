"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('electron', {
    minimize: function () { return electron_1.ipcRenderer.send('minimize-window'); },
    maximize: function () { return electron_1.ipcRenderer.send('maximize-window'); },
    close: function () { return electron_1.ipcRenderer.send('close-window'); },
    openExternal: function (url) { return electron_1.ipcRenderer.send('open-external', url); }
});
