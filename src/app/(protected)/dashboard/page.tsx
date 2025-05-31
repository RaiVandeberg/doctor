import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { usersClinicsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import SignOutButton from "./components/sign-out-button";
const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/authentication");
  }

  const clinics = await db.query.usersClinicsTable.findMany({
    where: eq(usersClinicsTable.userId, session.user.id),
  });

  if (clinics.length === 0) {
    redirect("/clinic-form");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{session?.user?.email}</p>

      <SignOutButton />
    </div>
  );
};

export default DashboardPage;
