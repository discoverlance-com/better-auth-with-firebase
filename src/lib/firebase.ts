import { firestoreAdapter } from "@/utils/better-auth-firebase-adapter";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// This check prevents re-initializing the app in hot-reloading environments (like Next.js)
if (!getApps().length) {
  initializeApp({
    credential:
      process.env.NODE_ENV === "development"
        ? cert({
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
            projectId: process.env.FIREBASE_PROJECT_ID,
          })
        : undefined,
  });
}

// Get the Firestore instance
const firestore = getFirestore();

export const authAdapter = firestoreAdapter(firestore, {
  usePlural: true, // This will use collection names like 'users', 'sessions'
  debugLogs: process.env.NODE_ENV === "development", // Only show logs in development
});
