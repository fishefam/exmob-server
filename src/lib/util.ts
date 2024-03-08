import type { FastifyReply, FastifyRequest } from 'fastify'

import detectPort from 'detect-port'
import { minify } from 'minify'

import type { TMinifyClientOption } from '../../type/mobius'

export function getRequestBody<T extends object>(request: FastifyRequest) {
  const { body } = request
  if (typeof body === 'string') return JSON.parse(body) as T
  return body as T
}

export function sendResponse<T extends object>(obj: T, reply: FastifyReply) {
  reply.send(obj)
}

export async function splitHTMLString(input: string, option?: TMinifyClientOption) {
  let rawMinified = input
  try {
    rawMinified = await minify.html(input, {
      html: {
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeAttributeQuotes: false,
        removeOptionalTags: false,
        sortAttributes: true,
        sortClassName: true,
        ...option,
      },
    })
  } catch {
    /* empty */
  }
  const pattern = {
    emptyScriptElement: /<script\b[^>]*>\s*<\/script>/gi,
    nonEmptySrcAttribute: /src\s*=\s*["']([^"']+)["'][^>]*/gi,
    scriptElement: /<script\b[^>]*>([\s\S]*?)<\/script>/gi,
    scriptSrcAttribute: /src\s*=\s*["']([^"']+)["'][^>]*/gi,
    scriptSrcKey: /src\s*=\s*"|"$/gi,
    scriptTag: /<\/?script[^>]*>/gi,
    styleElement: /<style>([\s\S]*?)<\/style>/gi,
    styleTag: /<\/?style[^>]*>/gi,
  }
  const cssElements = rawMinified.match(pattern.styleElement) ?? []
  const jsScripts = rawMinified.match(pattern.scriptElement) ?? []
  const inlineScripts = jsScripts
    .filter((element) => !pattern.emptyScriptElement.test(element))
    .map((element) => element.replace(pattern.scriptTag, ''))
  const externalScripts = jsScripts
    .filter((element) => pattern.emptyScriptElement.test(element))
    .filter((element) => pattern.nonEmptySrcAttribute.test(element))
    .map((script) => script.match(pattern.scriptSrcAttribute)?.[0] ?? '')
    .filter((src) => src.length)
    .map((script) => script.trim().replace(pattern.scriptSrcKey, ''))
  const css = cssElements.map((value) => value.replace(pattern.styleTag, '')).join('')
  const js = inlineScripts.filter((script) => script.length).join(';')
  let html = rawMinified
  for (const value of [...cssElements, ...jsScripts]) html = html.replace(value, '')
  return { css, externalScripts, html, js }
}

export async function getPort(port: number) {
  let _port = port
  try {
    _port = await detectPort(_port)
  } catch {
    _port += 1
  }
  return _port
}
