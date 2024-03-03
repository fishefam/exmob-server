import { exec } from 'child_process'
import chokidar from 'chokidar'
import { build, type BuildOptions } from 'esbuild'

main()

async function main() {
  const isDevelopment = process.env.NODE_ENV === 'development'
  const buildOption: BuildOptions = {
    bundle: true,
    entryPoints: ['src/index.ts'],
    format: 'esm',
    logLevel: isDevelopment ? 'silent' : 'info',
    minify: true,
    outfile: 'dist/index.js',
    platform: 'node',
  }

  if (isDevelopment)
    chokidar.watch('src').on('add', async () => {
      await build(buildOption)
      const cp = exec('pnpm start')
      cp.stdout?.pipe(process.stdout)
    })
  if (!isDevelopment) {
    await build(buildOption)
    const cp = exec('pnpm start')
    cp.stdout?.pipe(process.stdout)
  }
}
