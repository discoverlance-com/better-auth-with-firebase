"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { LoaderIcon, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as v from "valibot";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const PasskeySchema = v.object({
  passkey_name: v.pipe(
    v.string("Passkey name must be a valid text"),
    v.nonEmpty("Passkey name is required"),
    v.maxLength(50, "Passkey name must not be more than 50 characters")
  ),
});

export const CreatePasskey = () => {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const form = useForm<v.InferOutput<typeof PasskeySchema>>({
    resolver: valibotResolver(PasskeySchema),
    defaultValues: {
      passkey_name: "",
    },
  });

  const onSubmit = async (values: v.InferOutput<typeof PasskeySchema>) => {
    const result = await authClient.passkey.addPasskey({
      name: values.passkey_name,
      authenticatorAttachment: "cross-platform",
    });

    if (result?.error) {
      toast.error(result.error.message);

      // handle session freshness
      //@ts-ignore the code is part of the returned session data
      if (result.error.code === "SESSION_NOT_FRESH") {
      }
      return;
    }

    toast.success("Passkey added successfully.");
    form.reset();
    setOpen(false);
    router.refresh();
  };
  return (
    <div className="space-y-2">
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button
            size="sm"
            variant="secondary"
            className="flex items-center gap-1"
          >
            Register new Passkey
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Register passkey</AlertDialogTitle>
            <AlertDialogDescription>
              Add a nickname for the passkey. This can be the name of the device
              like "Work Laptop" or "Personal Phone" to allow you easily
              identify the passkey in the list of your passkeys.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="passkey_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Passkey Nickname</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        autoComplete="off"
                        required
                        maxLength={50}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <AlertDialogFooter className="flex justify-between items-center gap-8">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? (
                    <LoaderIcon className="animate-spin" />
                  ) : (
                    <PlusIcon />
                  )}{" "}
                  Register
                </Button>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
