import { build } from 'esbuild'

build({
  bundle: false,
  entryPoints: ['src/index.ts'],
  format: 'iife',
  logLevel: 'info',
  minify: true,
  outdir: 'dist',
  platform: 'node',
  target: 'es2016',
})
