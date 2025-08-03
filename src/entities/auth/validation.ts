import * as v from "valibot";

export const SignUpSchema = v.object({
  email: v.pipe(
    v.string("Email must be valid email address"),
    v.email("Email must be a valid email address"),
    v.nonEmpty("Email is required")
  ),
  password: v.pipe(
    v.string("Password must be valid text"),
    v.nonEmpty("Password is required"),
    v.minLength(12, "Password must be at least 12 characters"),
    v.maxLength(128, "Password must not be more than 128 characters"),
    v.regex(/[a-z]/, "Your password must contain a lowercase letter."),
    v.regex(/[A-Z]/, "Your password must contain a uppercase letter."),
    v.regex(/[0-9]/, "Your password must contain a number.")
  ),
  name: v.pipe(
    v.string("Name must be a valid text"),
    v.nonEmpty("Name is required"),
    v.minLength(3, "Name must be at least 3 characters"),
    v.maxLength(150, "Name must not be more than 150 characters")
  ),
});

export const SignInSchema = v.object({
  email: v.pipe(
    v.string("Email must be valid email address"),
    v.email("Email must be a valid email address"),
    v.nonEmpty("Email is required")
  ),
  password: v.pipe(
    v.string("Password must be valid text"),
    v.nonEmpty("Password is required")
  ),
});

export type SignInSchemaOutput = v.InferOutput<typeof SignInSchema>;

export type SignInSchemaIssues = v.InferIssue<typeof SignInSchema>;

export type SignUpSchemaOutput = v.InferOutput<typeof SignUpSchema>;

export type SignUpSchemaIssues = v.InferIssue<typeof SignUpSchema>;
