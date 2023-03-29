import { Router } from 'next/router'
import { NextResponse } from 'next/server'
import { auth, authAdmin, isAuthValid } from './lib/authentications'

export function middleware(request, response, event) {
  // this logic is many routes
  // console.log(request.nextUrl.pathname)
  // event.waitUntil(
  //   fetch('https://my-analytics-platform.com', {
  //     method: 'POST',
  //     body: JSON.stringify({ pathname: req.nextUrl.pathname }),
  //   })
  // )

  if (request.nextUrl.pathname.startsWith('/api/v1')) {
    NextResponse.next()
  }
  // ==========Authentication Back End==========

  if (request.nextUrl.pathname.startsWith('/api/v1/auth/')) {
    return auth(request)
  }
  // ==========Authentication Back End Admin==========

  if (request.nextUrl.pathname.startsWith('/api/v1/authadmin/')) {
    return authAdmin(request)
  }
  // ==========Authentication Front End==========
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // direct response back if fail for actions.
    return isAuthValid(request)
  }
}

// this logic is default
export const config = {
  // any routes to v1 match
  matcher: ['/api/v1/:path*', '/dashboard/:path*'],
}
