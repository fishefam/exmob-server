import { exec } from 'child_process'
import chokidar from 'chokidar'
import { build, type BuildOptions, type Plugin } from 'esbuild'
import clean from 'esbuild-plugin-clean'
import { readdirSync, readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

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
    plugins: [clean({ cleanOnEndPatterns: ['dist/type'], cleanOnStartPatterns: ['dist'] }), changeExtPlugin()],
  }

  if (isDevelopment) {
    chokidar.watch('src').on('all', async () => {
      await build(buildOption)
      exec('pnpm start')
    })
    console.log('[watch] Watching `src` directory...')
  }
  if (!isDevelopment) build(buildOption)
}

function changeExtPlugin(): Plugin {
  return { name: 'change-ext', setup: ({ onEnd }) => onEnd(() => changeExt('dist')) }
}

function changeExt(path: string) {
  const absolute = resolve(path)
  const isFile = checkIsFile(absolute)
  if (isFile) setFileContent({ match: /.ts"/g, path: absolute, text: '.js"' })
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

export async function setFileContent({
  match,
  path,
  processor,
  text,
}: {
  match?: RegExp | string
  path: string
  processor?: (input: string) => Promise<string> | string
  text?: string
}) {
  const absolute = resolve(path)
  const content = readFileSync(absolute, { encoding: 'utf-8' })
  if (typeof text === 'undefined' && typeof match === 'undefined' && !processor) return
  const newContent =
    match && typeof text === 'string' ? content.replace(match, text) : processor ? processor(content) : content
  writeFileSync(absolute, typeof newContent === 'string' ? newContent : await newContent)
}
