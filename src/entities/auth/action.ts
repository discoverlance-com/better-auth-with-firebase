"use server";

import { SignUpSchema, type SignUpSchemaOutput } from "./validation";
import * as v from "valibot";
import type { FormActionState } from "@/types/form";
import { convertValibotIssuesToFormErrors } from "@/utils/form";

export const signUpAction = async (
  _: FormActionState<SignUpSchemaOutput>,
  formData: FormData
) => {
  const values = Object.fromEntries(formData) as SignUpSchemaOutput;

  const { issues, success, output } = await v.safeParseAsync(
    SignUpSchema,
    values
  );

  if (!success) {
    const errorMap = convertValibotIssuesToFormErrors(issues);

    return {
      values,
      errors: errorMap,
    };
  }

  return {
    values,
    errors: {},
  };
};
