import { firestoreAdapter } from "@/utils/better-auth-firebase-adapter";
import { initializeApp, getApps, cert, type App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function initializeFirebaseAdmin(): App {
  // If the app is already initialized, return the existing instance
  if (getApps().length > 0) {
    return getApps()[0];
  }

  // Option 1: Use encoded FIREBASE_SERVICE_ACCOUNT_JSON
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    console.log("Initializing Firebase with encoded service account JSON...");
    const serviceAccount = JSON.parse(
      Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_JSON, "base64").toString(
        "utf-8"
      )
    );
    return initializeApp({
      credential: cert(serviceAccount),
    });
  }

  // Option 2: Production on Google Cloud (Cloud Run, Functions)
  // The check for GOOGLE_CLOUD_PROJECT is a reliable way to detect this environment.
  if (process.env.GOOGLE_CLOUD_PROJECT) {
    console.log(
      "Initializing Firebase with Application Default Credentials..."
    );
    return initializeApp();
  }

  // Option 3: Development Environment (using 3 separate vars)
  // This can be a fallback for local development if you prefer not to use the full JSON.
  if (
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY
  ) {
    console.log("Initializing Firebase with separate environment variables...");
    return initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      }),
    });
  }

  throw new Error(
    "Firebase Admin SDK credentials not found. Please set FIREBASE_SERVICE_ACCOUNT_JSON or Application Default Credentials."
  );
}

// Initialize and export the app instance
export const firebaseAdminApp = initializeFirebaseAdmin();

// Get the Firestore instance
const firestore = getFirestore();

export const authAdapter = firestoreAdapter(firestore, {
  usePlural: true, // This will use collection names like 'users', 'sessions'
  debugLogs: process.env.NODE_ENV === "development", // Only show logs in development
});
