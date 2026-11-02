import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PROTECTED = ["/tableau-de-bord"];
const AUTH_PAGES = ["/connexion", "/inscription"];

export async function middleware(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const path = request.nextUrl.pathname;

  // Supabase not configured yet: let public pages through, keep the dashboard closed.
  if (!url || !key) {
    if (PROTECTED.some((p) => path.startsWith(p))) {
      return NextResponse.redirect(new URL("/connexion", request.url));
    }
    return NextResponse.next();
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  // Refreshes the session cookie. Do not put code between createServerClient and getUser.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && PROTECTED.some((p) => path.startsWith(p))) {
    const to = new URL("/connexion", request.url);
    to.searchParams.set("suite", path);
    return NextResponse.redirect(to);
  }

  if (user && AUTH_PAGES.some((p) => path.startsWith(p))) {
    return NextResponse.redirect(new URL("/tableau-de-bord", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images/|.*\\.(?:png|jpg|jpeg|svg|webp|ico)$).*)"],
};
