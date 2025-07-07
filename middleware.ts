import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Check if the pathname is just '/' (root)
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/fr', request.url))
  }
  
  // Allow all other requests to pass through
  return NextResponse.next()
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}