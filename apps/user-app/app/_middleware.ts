"use server"

import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from './lib/auth'; // Adjust path as necessary

export async function middleware(req: NextRequest) {
  const session = await getServerSession(authOptions);

  // If the user is not authenticated and trying to access the home page
  if (!session?.user && req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/api/auth/signin', req.url));
  }

  // If the user is authenticated and trying to access the home page
  if (session?.user && req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Allow access for other paths
  return NextResponse.next();
}

export const config = {
  matcher: '/', // Apply this middleware only to the homepage
};
