import {
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from "@supabase/ssr";
import { Request, Response } from "express";

export function createClient(context: { req: Request; res: Response }) {
  return createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        // @ts-ignore just following the docs
        getAll() {
          return parseCookieHeader(context.req.headers.cookie ?? "");
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            const serialized = serializeCookieHeader(name, value, {
              ...options,
              sameSite: "none",
              secure: true,
            });
            context.res.append("Set-Cookie", serialized);
          });
        },
      },
      cookieOptions: {
        name: "sb-auth",
        sameSite: "none",
        secure: true,
      },
    },
  );
}
