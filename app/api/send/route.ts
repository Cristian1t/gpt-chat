import query from '@/lib/queryApi'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { prompt } = await req.json()
  const response = await query(prompt)
  return NextResponse.json(response)
}
