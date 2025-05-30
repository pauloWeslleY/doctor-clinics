import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { usersToClinicsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { Routes } from "@/lib/routes";

import SignOutButton from "./components/sign-out-button";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect(Routes.Authentication);
  }

  // Preciso pegar as clínicas do usuário logado
  const clinics = await db.query.usersToClinicsTable.findMany({
    where: eq(usersToClinicsTable.userId, session.user.id),
  });

  if (clinics.length === 0) {
    redirect(Routes.ClinicForm);
  }

  return (
    <div>
      <h1>DashboardPage</h1>
      <h1>{session?.user?.name}</h1>
      <h1>{session?.user?.email}</h1>

      <SignOutButton />
    </div>
  );
};

export default DashboardPage;
