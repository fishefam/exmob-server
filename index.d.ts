declare module NodeJS {
  interface ProcessEnv {
    DEV_HOST: 'true'
    NODE_ENV: 'development' | 'production'
  }
}

declare module 'esbuild-plugin-babel' {
  export default function babel(option?: { config?: object; filter?: RegExp | string }): Plugin
}
