import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
  const jwt = request.cookies.get('jwt')

  if (!jwt) return NextResponse.redirect(new URL('/login', request.url))

  try {
    await jwtVerify(jwt.value, new TextEncoder().encode(process.env.JWT_SECRET))

    return NextResponse.next()
  } catch (error) {
    console.log(error)
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/profile/:path*'],
}
