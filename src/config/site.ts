export const siteLinks = {
  home: "/",
  signin: "/",
  signup: "/register",
  forgotPassword: "/forgot-password",
  privacyPolicy: "/privacy-policy",
  termsOfService: "/terms",
  dashoard: {
    index: "/dashboard",
    settings: {
      index: "/dashboard/settings",
    },
    account: "/dashboard/account",
  },
} as const;

export const siteInfo = {
  title: "Better Auth Firebase",
  description:
    "This project aims to test and provide a sample integration between better auth and firebase.",
};
