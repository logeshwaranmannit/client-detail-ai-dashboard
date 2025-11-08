import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // Allow all requests without authentication
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};