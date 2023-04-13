import query from '@/lib/queryApi'

export async function GET(request: Request) {
  const response = await query('Hello world')
  // return as json
  return new Response(JSON.stringify(response), {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  })
}
