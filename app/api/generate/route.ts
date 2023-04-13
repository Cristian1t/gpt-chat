import { OpenAIStream } from '@/lib/OpenAIStream'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

export async function POST(req: NextRequest) {
  const { prompt } = (await req.json()) as {
    prompt?: string
  }

  const payload = {
    model: 'text-davinci-003',
    prompt,
    temperature: 0.9,
    max_tokens: 1000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  }

  const stream = await OpenAIStream(payload)
  return new Response(stream)
}
