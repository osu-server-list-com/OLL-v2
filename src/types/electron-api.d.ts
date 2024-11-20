declare global {
  interface Window {
    electron: {
      minimize: () => void;
      maximize: () => void;
      close: () => void;
      openExternal: (url: string) => void;
      openFileDialog: () => Promise<string | null>;
      launchOsu: (osuPath: string[], serverName: string) => Promise<boolean>;
      changeOsuPath: () => Promise<string | null>;
      createShortcut: () => Promise<boolean>;
      checkDefaultOsuPath: () => Promise<string | null>;
      getVersion: () => Promise<string>;
    }
  }
}

export {}; 