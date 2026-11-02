import { NextResponse, type NextRequest } from "next/server";

/* Demo auth: the merchant area is reachable once a demo session cookie exists.
   (Name kept in sync with DEMO_COOKIE in src/lib/demo-session.ts — middleware
   runs on the edge and cannot import that server-only module.) */
const DEMO_COOKIE = "kusa_demo";
const PROTECTED = ["/tableau-de-bord"];
const AUTH_PAGES = ["/connexion", "/inscription"];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const signedIn = Boolean(request.cookies.get(DEMO_COOKIE)?.value);

  if (!signedIn && PROTECTED.some((p) => path.startsWith(p))) {
    const to = new URL("/connexion", request.url);
    to.searchParams.set("suite", path);
    return NextResponse.redirect(to);
  }

  if (signedIn && AUTH_PAGES.some((p) => path.startsWith(p)) && !request.nextUrl.searchParams.has("oubli")) {
    return NextResponse.redirect(new URL("/tableau-de-bord", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/tableau-de-bord/:path*", "/connexion", "/inscription"],
};
