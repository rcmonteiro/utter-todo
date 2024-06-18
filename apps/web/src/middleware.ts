import { type NextRequest, NextResponse } from 'next/server'

export const middleware = (request: NextRequest) => {
  const { pathname, searchParams } = request.nextUrl

  if (pathname.startsWith('/tasks')) {
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-status', searchParams.get('status') ?? 'ALL')
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  }

  return NextResponse.next()
}
