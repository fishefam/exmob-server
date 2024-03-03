import type { Options } from 'html-minifier-terser'

export type TBaseCodeLang = 'CSS' | 'HTML' | 'JS'
export type TCodeLang = 'MAPLE' | TBaseCodeLang
export type TBaseSection = 'authorNote' | 'feedback' | 'question'
export type TSection = 'algorithm' | TBaseSection

export type TRequestData = { [key in TSection]: string }
export type TResponseData = { [key in 'algorithm' | `${TBaseSection}${TBaseCodeLang}`]: string } & {
  [key in `${TBaseSection}ExternalScripts`]: string[]
}

export type TMinifyClientOption = Omit<
  Options,
  | 'customAttrAssign'
  | 'customAttrCollapse'
  | 'customAttrSurround'
  | 'customEventAttributes'
  | 'minifyCSS'
  | 'minifyJS'
  | 'minifyURLs'
>
