import type { FieldError } from "react-hook-form";

export type FormErrorMap<T> = Record<keyof T, FieldError>;

export interface FormActionState<TValues> {
  errors: Partial<FormErrorMap<TValues>>;
  values: TValues;
}
