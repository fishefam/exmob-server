declare module NodeJS {
  interface ProcessEnv {
    DEV_HOST: 'true'
    NODE_ENV: 'development' | 'production'
    RENDER?: unknown
  }
}

declare module 'esbuild-plugin-babel' {
  export default function babel(option?: { config?: object; filter?: RegExp | string }): Plugin
}

declare module 'detect-port' {
  export default function detectPort(initialPort: number): Promise<number>
}
