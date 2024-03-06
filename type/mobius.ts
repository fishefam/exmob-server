import type { Options } from 'html-minifier-terser'

export type BaseLang = 'CSS' | 'HTML' | 'JS'
export type Lang = 'MAPLE' | BaseLang
export type BaseSection = 'authorNote' | 'feedback' | 'question'
export type Section = 'algorithm' | BaseSection

export type RequestData = { [key in Section]: string }
export type ResponseData = { [key in 'algorithm' | `${BaseSection}${BaseLang}`]: string } & {
  [key in `${BaseSection}ExternalScripts`]: string[]
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
