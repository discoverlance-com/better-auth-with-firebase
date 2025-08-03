"use client";

import { authClient } from "@/lib/auth-client";

export const Auth = () => {
  const handleSignUp = async (
    email: string,
    password: string,
    name: string,
    image?: string
  ) => {
    const { data, error } = await authClient.signUp.email(
      {
        email, // user email address
        password, // user password -> min 8 characters by default
        name, // user display name
        image, // User image URL (optional)
        callbackURL: "/dashboard", // A URL to redirect to after the user verifies their email (optional)
      },
      {
        onRequest: (ctx) => {
          //show loading
          console.log("SENDING REQUEST");
          console.log({ ctx: ctx.auth });
        },
        onSuccess: (ctx) => {
          console.log(ctx.data);
          //redirect to the dashboard or sign in page
          console.log("YOU ARE LOGGED IN");
        },
        onError: (ctx) => {
          // display the error message
          alert(ctx.error.message);
        },
      }
    );

    console.log({ data, error });
  };

  const handleSignIn = async (email: string, password: string) => {
    const { data, error } = await authClient.signIn.email(
      {
        email, // user email address
        password, // user password -> min 8 characters by default
        callbackURL: "/dashboard", // A URL to redirect to after the user verifies their email (optional)
      },
      {
        onRequest: (ctx) => {
          //show loading
          console.log("SENDING REQUEST");
          console.log({ ctx: ctx.auth });
        },
        onSuccess: (ctx) => {
          console.log(ctx.data);
          //redirect to the dashboard or sign in page
          console.log("YOU ARE LOGGED IN");
        },
        onError: (ctx) => {
          // display the error message
          alert(ctx.error.message);
        },
      }
    );

    console.log({ data, error });
  };
  return (
    <div className="gap-4 flex items-center">
      <button
        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
        onClick={() => {
          handleSignUp("lanarmah@gmail.com", "password1234", "Lance");
        }}
      >
        Sign Up
      </button>

      <button
        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
        onClick={() => {
          handleSignIn("lanarmah@gmail.com", "password123");
        }}
      >
        Sign In
      </button>
    </div>
  );
};
