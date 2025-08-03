"use client";

import { useFormStatus } from "react-dom";
import { Button, type ButtonProps } from "./ui/button";
import { Loader } from "lucide-react";

export const SubmitButton = ({ children, disabled, ...props }: ButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} {...props}>
      {pending && <Loader className="mr-1 animate-spin" />} {children}
    </Button>
  );
};
