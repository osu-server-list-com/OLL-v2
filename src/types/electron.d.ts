declare global {
  interface Window {
    electron: {
      minimize: () => void;
      maximize: () => void;
      close: () => void;
      openExternal: (url: string) => void;
      openFileDialog: () => Promise<string | null>;
      launchOsu: (path: string[], serverName: string) => Promise<boolean>;
      createShortcut: () => Promise<boolean>;
      changeOsuPath: () => Promise<string | null>;
    }
  }
}

export {}