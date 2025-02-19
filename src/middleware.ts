import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname from the URL
  const path = request.nextUrl.pathname

  // Check if we're accessing protected routes
  if (path === '/houston' || path === '/austin') {
    // Get the auth cookie
    const authCookie = request.cookies.get('auth_token')
    
    // If no auth cookie exists, redirect to login
    if (!authCookie) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // Verify the auth cookie matches the correct location
    try {
      if (path === '/houston' && authCookie.value !== 'houston_authorized') {
        return NextResponse.redirect(new URL('/', request.url))
      }
      if (path === '/austin' && authCookie.value !== 'austin_authorized') {
        return NextResponse.redirect(new URL('/', request.url))
      }
    } catch {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: ['/houston', '/austin']
} 