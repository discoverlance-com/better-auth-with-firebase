import { betterAuth } from "better-auth";
import { authAdapter } from "./firebase";
import { nextCookies } from "better-auth/next-js";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

export const auth = betterAuth({
  database: authAdapter,
  plugins: [nextCookies()],
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 12,
    autoSignIn: false,
  },
  rateLimit: {
    storage: "database",
    modelName: "rateLimit",
    enabled: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
    freshAge: 60 * 30, // 30 minutes (the session is fresh if created within the last 30 minutes)
  },
  cookieCache: {
    enabled: true,
    maxAge: 15 * 60, // Cache duration in seconds
  },
});

export const requireAuthentication = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }
});
