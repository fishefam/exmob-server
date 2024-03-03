import { build } from 'esbuild'

build({
  bundle: true,
  entryPoints: ['src/index.ts'],
  format: 'esm',
  logLevel: 'info',
  minify: true,
  outfile: 'dist/index.js',
  platform: 'node',
})
