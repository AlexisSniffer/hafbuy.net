import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { get } from '@vercel/edge-config'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // Check Edge Config to see if the maintenance page should be shown
  const isInMaintenanceMode = await get('isInMaintenanceMode')

  // If in maintenance mode, point the url pathname to the maintenance page
  if (isInMaintenanceMode) {
    request.nextUrl.pathname = `/maintenance`

    // Rewrite to the url
    return NextResponse.rewrite(request.nextUrl)
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/',
}
