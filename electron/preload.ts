import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electron', {
  minimize: () => ipcRenderer.send('minimize-window'),
  maximize: () => ipcRenderer.send('maximize-window'),
  close: () => ipcRenderer.send('close-window'),
  openExternal: (url: string) => ipcRenderer.send('open-external', url),
  launchOsu: (path: string[], serverName: string) => ipcRenderer.invoke('launch-osu', path[0], serverName),
  openFileDialog: () => ipcRenderer.invoke('dialog:openFile'),
  createShortcut: () => ipcRenderer.invoke('create-shortcut'),
  changeOsuPath: () => ipcRenderer.invoke('dialog:openFile'),
  checkDefaultOsuPath: () => ipcRenderer.invoke('check-default-osu-path'),
  getVersion: () => ipcRenderer.invoke('get-version'),
  getServerList: () => ipcRenderer.invoke('get-server-list')
})