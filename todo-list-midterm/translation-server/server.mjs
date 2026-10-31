import {createServer} from 'node:http'
import {translate} from '@vitalets/google-translate-api'

const port = Number(process.env.TRANSLATION_PORT || 3002)
const allowedOrigins = new Set([
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:4173',
  'http://127.0.0.1:4173',
])
const supportedLanguages = new Set([
  'zh-CN',
  'zh-TW',
  'en',
  'ja',
  'ko',
  'fr',
  'es',
  'de',
  'it',
  'pt',
  'ru',
  'ar',
])

const sendJson = (response, status, body) => {
  response.writeHead(status, {'Content-Type': 'application/json; charset=utf-8'})
  response.end(JSON.stringify(body))
}

const readJsonBody = async (request) => {
  let body = ''
  for await (const chunk of request) {
    body += chunk
    if (Buffer.byteLength(body) > 10_000) {
      throw new Error('Request body must be 10 KB or smaller.')
    }
  }
  return JSON.parse(body)
}

const server = createServer(async (request, response) => {
  const origin = request.headers.origin
  if (allowedOrigins.has(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin)
    response.setHeader('Vary', 'Origin')
  }

  if (request.method === 'OPTIONS') {
    response.writeHead(204, {
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    })
    response.end()
    return
  }

  if (request.method !== 'POST' || request.url !== '/api/translate') {
    sendJson(response, 404, {error: 'Translation endpoint not found.'})
    return
  }

  let body
  try {
    body = await readJsonBody(request)
  } catch (error) {
    sendJson(response, 400, {error: error.message || 'Request body must be valid JSON.'})
    return
  }

  if (!body || typeof body.text !== 'string' || !body.text.trim()) {
    sendJson(response, 400, {error: 'Text is required.'})
    return
  }
  if (body.text.length > 5000) {
    sendJson(response, 413, {error: 'Text must be 5000 characters or fewer.'})
    return
  }
  if (typeof body.targetLanguage !== 'string' || !supportedLanguages.has(body.targetLanguage)) {
    sendJson(response, 400, {error: 'Choose a supported target language.'})
    return
  }

  try {
    const result = await translate(body.text, {from: 'auto', to: body.targetLanguage})
    if (typeof result.text !== 'string') {
      sendJson(response, 502, {error: 'Google Translate returned no translated text.'})
      return
    }

    sendJson(response, 200, {
      translatedText: result.text,
      targetLanguage: body.targetLanguage,
      alternatives: [],
      detectedLanguage: result.raw?.src || '',
    })
  } catch (error) {
    console.error('Google Translate request failed:', error)
    const status = error.name === 'TooManyRequestsError' ? 429 : 502
    const message = status === 429
      ? 'Google Translate rate limit reached. Try again later.'
      : 'Google Translate request failed. Check your connection and try again.'
    sendJson(response, status, {error: message})
  }
})

server.listen(port, () => {
  console.log(`Google Translate proxy listening at http://localhost:${port}`)
})
