import { auth, requireAuthentication } from "@/lib/auth";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { headers } from "next/headers";
import { TrashIcon, User } from "lucide-react";
import { SubmitButton } from "@/components/submit-button";
import { format } from "date-fns";
import { CreatePasskey } from "./create-passkey";
import { revalidatePath } from "next/cache";
import { siteLinks } from "@/config/site";
import { redirect } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const metadata: Metadata = { title: "Account" };

async function deletePasskeyAction(formData: FormData) {
  "use server";
  const id = formData.get("passkeyId") as string;

  if (!id) {
    // do nothing for now
    return;
  }

  try {
    await auth.api.deletePasskey({
      body: {
        id: id, // required
      },
      // This endpoint requires session cookies.
      headers: await headers(),
    });
  } catch (error) {
    // do nothing for now
  } finally {
    revalidatePath(siteLinks.dashoard.account);
    redirect(siteLinks.dashoard.account);
  }
}

export default async function Page() {
  await requireAuthentication();

  const passkeys = await auth.api.listPasskeys({
    headers: await headers(),
  });

  return (
    <>
      <SiteHeader title="Account" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
              <Card className="@container/card">
                <CardHeader>
                  <CardTitle>Passkeys</CardTitle>
                  <CardDescription>
                    Use passkeys to sign in with a simple fingerprint, face
                    scan, or screen lock, eliminating the need to remember and
                    type passwords.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CreatePasskey />
                  <div className="flex justify-between items-center p-2 border-b border-gray-200">
                    <h2 className="font-semibold">Your passkeys</h2>
                  </div>
                  {passkeys.length ? (
                    <ul
                      className="mt-6 px-2 border border-gray-200 rounded-sm overflow-hidden"
                      title="passkeys"
                    >
                      {passkeys.map((passkey) => (
                        <li
                          key={passkey.id}
                          className="border-b border-gray-200 last:border-none"
                        >
                          <div className="p-3">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-3">
                                <div className="bg-gray-200 p-2 rounded-full">
                                  <User className="h-4 w-4 text-gray-600" />
                                </div>
                                <div>
                                  <h3 className="font-medium">
                                    {passkey.name}
                                  </h3>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {passkey.backedUp && (
                                  <span className="text-primary text-sm px-3 py-1 bg-primary/10 rounded-md">
                                    {passkey.backedUp ? "Synced" : ""}
                                  </span>
                                )}

                                <form action={deletePasskeyAction}>
                                  <input
                                    type="hidden"
                                    name="passkeyId"
                                    value={passkey.id}
                                  />

                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <SubmitButton
                                        type="submit"
                                        variant="destructive"
                                        size="sm"
                                        className="px-2 py-1"
                                      >
                                        <TrashIcon />
                                      </SubmitButton>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Delete passkey</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </form>
                              </div>
                            </div>
                            <p className="text-muted-foreground text-sm mt-2">
                              Registered on{" "}
                              {format(
                                new Date(passkey.createdAt),
                                "LLL d, yyyy"
                              )}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-left text-muted-foreground text-sm mt-6">
                      You have not added any passkeys yet
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
