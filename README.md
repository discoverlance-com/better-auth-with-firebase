# Better Auth With Firestore

This project aims to test and provide a sample integration between better auth and firebase.
Firebase does come with it's own authentication system but it does present less controls over the authentication as you can only do what firebase makes possible or allows.

This project aims to try to fix this by allowing you to setup your own authentication with [better auth](https://www.better-auth.com).

**NOTE**:
This setup means you will not be getting the benefits of security rules (firestore) integration with firebase auth since you are managing your own auth.
Although, you could still try to create the users in firebase after adding them to better auth using something like [hooks](https://www.better-auth.com/docs/concepts/hooks). This might include you just adding the user's email to firebase auth but you will need to find a custom method to allow the firebase client sdk to work. You can try to sign in the user with firebase client sdk using `signInWithCustomToken` which requires you to generate a custom token with the admin sdk and then sending it to the client or browser for the `signInWithCustomToken` method.

Or, you can just use the firebase admin sdk to perform all firestore operations. This allows you to still get the authorization benefits from better auth to perform checks before you go ahead to allow database or firebase operations.

## Getting Started

First, the packages

```bash
npm install
# or
yarn
# or
pnpm install
# or
bun install
```

Afterwards, add your environment variables:

> You have 3 options in the `src/lib/firebase.ts` file to setup the firebase admin. If you are on GCP, you can make sure your service account attached to your instance or service has access to firebase and the firebase admin sdk will use that. In development or other platforms like local/dev/vercel, you can choose to base64 encode your service account file and set it in your environment variable as `FIREBASE_SERVICE_ACCOUNT_JSON` or add the client email, project id and private key from your firebase service account json to your environment variables (the keys for this options are in the .env.example).

```bash
cp .env.example .env # add your firebase and better auth credentials
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Tools

The following are tools used in building this application

- [Better Auth](https://www.better-auth.com) - custom authentication with typescript.
- [Tailwindcss](https://tailwindcss.com/) - css utility library
- [Firebase](https://firebase.google.com) - a saas with auth, db and more features
- [Shadcn](https://ui.shadcn.com) - an extendable component library for react

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
