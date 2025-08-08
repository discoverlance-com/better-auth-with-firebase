"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { LoaderIcon, SendIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as v from "valibot";

const UserDetailsSchema = v.object({
  name: v.pipe(
    v.string("Name must be a valid text"),
    v.nonEmpty("Name is required"),
    v.maxLength(150, "Name must not be more than 150 characters")
  ),
});

export const UpdateUserDetails = ({ name }: { name?: string }) => {
  const router = useRouter();

  const form = useForm<v.InferOutput<typeof UserDetailsSchema>>({
    resolver: valibotResolver(UserDetailsSchema),
    defaultValues: {
      name: name,
    },
  });

  const onSubmit = async (values: v.InferOutput<typeof UserDetailsSchema>) => {
    const result = await authClient.updateUser({ name: values.name });

    if (result.error) {
      toast.error(result.error.message);
      return;
    }

    toast.success("Your profile has been successfully updated");
    router.refresh();
  };
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Update your profile information</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      autoComplete="name"
                      required
                      maxLength={150}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <LoaderIcon className="animate-spin" />
              ) : (
                <SendIcon />
              )}{" "}
              Update
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
