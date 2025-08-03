// pages/terms.tsx
export default function TermsOfService() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="mb-4">
        This is a demo application created to explore better authentication
        patterns using Next.js.
      </p>
      <p className="mb-4">
        By using this app, you acknowledge that it's purely for demonstration
        purposes. There are no guarantees of uptime, feature completeness, or
        data retention.
      </p>
      <p className="mb-4">
        You may use this application as-is, clone it, or modify it for your own
        projects. There are no commercial terms, SLAs, or legal obligations
        associated with its use.
      </p>
      <p className="mb-4">
        We reserve the right to remove or change the app at any time without
        notice.
      </p>
      <p className="text-sm text-muted-foreground mt-8">
        Last updated: August 3, 2025
      </p>
    </main>
  );
}
