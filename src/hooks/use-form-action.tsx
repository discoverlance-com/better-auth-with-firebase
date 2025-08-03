import { useActionState } from "react";
import type { FormActionState } from "@/types/form";

export function useFormAction<TValues>(
  action: (
    prevState: FormActionState<TValues>,
    formData: FormData
  ) => Promise<FormActionState<TValues>>,
  initialValue: FormActionState<TValues>
) {
  return useActionState(action, initialValue);
}
