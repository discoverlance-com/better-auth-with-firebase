import { betterAuth } from "better-auth";
import { authAdapter } from "./firebase";

export const auth = betterAuth({
  database: authAdapter,
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
    expiresIn: 60 * 60 * 24 * 3, // 3 days
    updateAge: 60 * 60 * 12, // 12 hours (every 12 hours the session expiration is updated)
    freshAge: 60 * 60 * 6, // 6 hours (the session is fresh if created within the last 6 hours)
  },
  cookieCache: {
    enabled: true,
    maxAge: 15 * 60, // Cache duration in seconds
  },
});
