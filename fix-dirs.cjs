#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function trimDirNames(baseDir) {
  let items;
  try {
    items = fs.readdirSync(baseDir);
  } catch (e) {
    return;
  }

  for (const item of items) {
    const fullPath = path.join(baseDir, item);
    let stat;
    try {
      stat = fs.statSync(fullPath);
    } catch (e) {
      continue;
    }

    if (stat.isDirectory()) {
      const trimmed = item.trim();
      let dirPath = fullPath;

      if (trimmed !== item) {
        const newPath = path.join(baseDir, trimmed);
        if (!fs.existsSync(newPath)) {
          fs.renameSync(fullPath, newPath);
          console.log(`Renamed: "${item}" -> "${trimmed}" in ${baseDir}`);
          dirPath = newPath;
        } else {
          dirPath = newPath;
        }
      }

      if (!['node_modules', '.git', 'dist', '.vercel'].includes(trimmed)) {
        trimDirNames(dirPath);
      }
    }
  }
}

console.log('Fixing directory names with spaces...');
trimDirNames('.');
console.log('Directory names fixed.');

const viteConfig = `import base44 from "@base44/vite-plugin"
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  logLevel: 'error',
  plugins: [
    base44({
      legacySDKImports: process.env.BASE44_LEGACY_SDK_IMPORTS === 'true',
      hmrNotifier: true,
      navigationNotifier: true,
      analyticsTracker: true,
      visualEditAgent: true
    }),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: true,
  }
});
`;

fs.writeFileSync('vite.config.js', viteConfig);
console.log('vite.config.js updated with path alias.');

console.log('Running vite build...');
execSync('npm run build', { stdio: 'inherit' });
