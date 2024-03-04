import type { Stats } from 'fs'

import chokidar from 'chokidar'
import { build, type BuildOptions, type Plugin } from 'esbuild'
import { readdirSync, readFileSync, writeFileSync } from 'fs'
import nodemon from 'nodemon'
import { resolve } from 'path'
import { rimrafSync } from 'rimraf'

main()

async function main() {
  const isDevelopment = process.env.NODE_ENV === 'development'
  const buildOption: BuildOptions = {
    bundle: false,
    entryPoints: ['src/**'],
    format: 'esm',
    logLevel: isDevelopment ? 'silent' : 'info',
    minify: true,
    outdir: 'dist',
    platform: 'node',
    plugins: [changeExtPlugin()],
  }

  if (isDevelopment) {
    console.log('[watch] Watching `src` directory...')
    const dev = (event?: string, path?: string, ___?: Stats) => {
      rimrafSync('dist')
      build(buildOption)
      if (event && path) console.log(`[watch] ${event?.charAt(0).toUpperCase().concat(event.slice(1))} ${path}`)
      if (event && path) console.log('[watch] Rebuild and restart server...')
    }
    dev()
    nodemon('dist')
    chokidar.watch(['src', 'type'], { ignoreInitial: true }).on('all', dev)
  }
  if (!isDevelopment) {
    rimrafSync('dist')
    build(buildOption)
  }
}

function changeExtPlugin(): Plugin {
  return { name: 'change-ext', setup: ({ onEnd }) => onEnd(() => changeExt('dist')) }
}

function changeExt(path: string) {
  const absolute = resolve(path)
  const isFile = checkIsFile(absolute)
  if (isFile) {
    let content = readFileSync(absolute, { encoding: 'utf-8' })
    const matches = content.match(/from(['"])\.\.?\/([^'"\n]+)(?:['"])/g) ?? []
    const replaces = matches.map((match) => {
      const temp = match.replace(/\.ts/gi, '').trim()
      return { match, replace: temp.slice(0, -1) + '.js' + temp.slice(-1)[0] }
    })
    for (const { match, replace } of replaces) content = content.replace(match, replace)
    writeFileSync(absolute, content)
  }
  if (!isFile) {
    const items = readdirSync(absolute)
    for (const item of items) changeExt(`${path}/${item}`)
  }
}

function checkIsFile(path: string) {
  const absolute = resolve(path)
  let isFile = true
  try {
    readFileSync(absolute)
  } catch {
    isFile = false
  }
  return isFile
}
