import { requireAuthentication } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: React.PropsWithChildren) {
  await requireAuthentication();

  return <div>{children}</div>;
}
