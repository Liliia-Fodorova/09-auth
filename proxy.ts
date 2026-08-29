import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { parseSetCookie } from "cookie";
import { checkSession } from "./lib/api/serverApi";

const privateRoutes = ["/profile/", "/notes/"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const sessionId = cookieStore.get("sessionId")?.value;

  const { pathname } = request.nextUrl;

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!accessToken) {
    if (refreshToken && sessionId) {
      const data = await checkSession();

      const setCookie = data.headers["set-cookie"];

      if (setCookie) {
        const cookieArray = Array.isArray(setCookie)
          ? setCookie
          : [setCookie];

        for (const cookieStr of cookieArray) {
          const parsed = parseSetCookie(cookieStr);

          if (parsed) {
            cookieStore.set(parsed.name, parsed.value ?? "", {
              expires: parsed.expires,
              maxAge: parsed.maxAge,
              path: parsed.path,
              domain: parsed.domain,
              httpOnly: parsed.httpOnly,
              secure: parsed.secure,
              sameSite: parsed.sameSite,
            });
          }
        }

        if (isPublicRoute) {
          return NextResponse.redirect(new URL("/", request.url), {
            headers: {
              Cookie: cookieStore.toString(),
            },
          });
        }

        if (isPrivateRoute) {
          return NextResponse.next({
            headers: {
              Cookie: cookieStore.toString(),
            },
          });
        }
      }
    }

    if (isPublicRoute) {
      return NextResponse.next();
    }

    if (isPrivateRoute) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  if (isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isPrivateRoute) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};