import type { FormErrorMap } from "@/types/form";
import { BaseIssue } from "valibot";

export const convertValibotIssuesToFormErrors = <T>(
  issues: BaseIssue<T>[]
): Partial<FormErrorMap<T>> => {
  const errorMap: Partial<FormErrorMap<T>> = {};

  for (const issue of issues) {
    const field = issue.path?.[0]?.key as keyof T;
    if (!field) continue;

    if (!errorMap[field]) {
      errorMap[field] = {
        message: issue.message,
        type: "manual",
      };
    }
  }

  return errorMap;
};
