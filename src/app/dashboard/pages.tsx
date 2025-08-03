import { requireAuthentication } from "@/utils/auth";

export default async function Dashboard() {
  await requireAuthentication();

  return (
    <div>
      <h1 className="text-5xl text-center font-bold">This is the dashboard</h1>
    </div>
  );
}
