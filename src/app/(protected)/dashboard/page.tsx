import { headers } from "next/headers";
import { redirect } from "next/navigation";

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

  if (session?.user.clinic) {
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
