// pages/privacy.tsx
export default function PrivacyPolicy() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        This application is a demo built to explore and test authentication
        patterns in Next.js.
      </p>
      <p className="mb-4">
        As part of the authentication flow, the application may use cookies or
        local storage to manage user sessions. These are only used to support
        the login functionality and are not shared with third parties.
      </p>
      <p className="mb-4">
        Local storage or other browser APIs may be used to temporarily store
        non-sensitive session data strictly required for app functionality.
      </p>
      <p className="mb-4">
        This project does not collect, analyze, or sell personal information. No
        tracking or analytics tools are integrated.
      </p>
      <p className="mb-4">
        If you fork or reuse this project, you are responsible for ensuring that
        your deployment complies with applicable privacy and data protection
        laws.
      </p>
      <p className="text-sm text-muted-foreground mt-8">
        Last updated: August 3, 2025
      </p>
    </main>
  );
}
