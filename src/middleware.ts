/*import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { get } from '@vercel/edge-config'*/

export { default } from 'next-auth/middleware'

/*export async function middleware(request: NextRequest) {
  const isInMaintenanceMode = await get('isInMaintenanceMode')

  if (isInMaintenanceMode) {
    request.nextUrl.pathname = `/maintenance`

    return NextResponse.rewrite(request.nextUrl)
  }
}*/

export const config = { matcher: ['/profile/:path*'] }
