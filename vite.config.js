"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vite_1 = require("vite");
const vite_plugin_electron_1 = __importDefault(require("vite-plugin-electron"));
const vite_plugin_electron_renderer_1 = __importDefault(require("vite-plugin-electron-renderer"));
const plugin_react_1 = __importDefault(require("@vitejs/plugin-react"));
exports.default = (0, vite_1.defineConfig)({
    server: {
        port: 5173,
        strictPort: true,
        host: true
    },
    plugins: [
        (0, plugin_react_1.default)(),
        (0, vite_plugin_electron_1.default)([
            {
                entry: 'electron/main.ts',
                vite: {
                    build: {
                        outDir: 'dist-electron',
                        sourcemap: true,
                        rollupOptions: {
                            external: ['electron']
                        }
                    }
                }
            },
            {
                entry: 'electron/preload.ts',
                vite: {
                    build: {
                        outDir: 'dist-electron',
                        sourcemap: true
                    }
                },
                onstart(options) {
                    options.reload();
                },
            }
        ]),
        (0, vite_plugin_electron_renderer_1.default)()
    ]
});
