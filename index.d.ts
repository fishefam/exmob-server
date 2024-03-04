declare module NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
  }
}

declare module 'esbuild-plugin-babel' {
  export default function babel(option?: { config?: object; filter?: RegExp | string }): Plugin
}
