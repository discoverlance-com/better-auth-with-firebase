import { betterAuth } from "better-auth";
import { authAdapter } from "./firebase";
import { nextCookies } from "better-auth/next-js";
import { oneTap } from "better-auth/plugins";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { siteInfo, siteLinks } from "@/config/site";
import { passkey } from "better-auth/plugins/passkey";

export const auth = betterAuth({
  database: authAdapter,
  plugins: [
    passkey({
      rpName: siteInfo.title,
      origin: process.env.BETTER_AUTH_URL,
      authenticatorSelection: {
        userVerification: "required",
        residentKey: "preferred",
      },
    }),
    oneTap({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      disableSignup: false,
    }),
    nextCookies(),
  ],
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 12,
    autoSignIn: true,
  },
  account: {
    accountLinking: {
      enabled: true,
      allowDifferentEmails: false,
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
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
    cookieCache: {
      enabled: true,
      maxAge: 15 * 60, // Cache duration in seconds
    },
  },
});

export const requireAuthentication = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(siteLinks.signin);
  }
});

export const requireAnonymousUser = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect(siteLinks.dashoard.index);
  }
});
