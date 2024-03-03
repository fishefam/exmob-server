import type { FastifyReply, FastifyRequest } from 'fastify'

import type { TRequestData } from '../type/mobius.ts'

import { getRequestBody, splitHTMLString } from '../lib/util.ts'

export async function POST(request: FastifyRequest, reply: FastifyReply) {
  const { algorithm, authorNote, feedback, question } = getRequestBody<TRequestData>(request)
  const [questionPack, authorNotePack, feedbackPack] = await Promise.all(
    [question, authorNote, feedback].map((value) => splitHTMLString(value)),
  )
  reply.send({
    algorithm,
    authorNoteCSS: authorNotePack?.css,
    authorNoteExternalScripts: authorNotePack?.externalScripts,
    authorNoteHTML: authorNotePack?.html,
    authorNoteJS: authorNotePack?.js,
    feedbackCSS: feedbackPack?.css,
    feedbackExternalScripts: feedbackPack?.externalScripts,
    feedbackHTML: feedbackPack?.html,
    feedbackJS: feedbackPack?.js,
    questionCSS: questionPack?.css,
    questionExternalScripts: questionPack?.externalScripts,
    questionHTML: questionPack?.html,
    questionJS: questionPack?.js,
  })
}
