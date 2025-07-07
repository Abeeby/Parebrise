import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Simple redirect from root to /fr
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/fr', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/',
}