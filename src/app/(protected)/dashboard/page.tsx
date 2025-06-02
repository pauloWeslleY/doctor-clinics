import { redirect } from "next/navigation";

import { getUserAuthenticated } from "@/helpers/user-auth";
import { Routes } from "@/lib/routes";

import SignOutButton from "./components/sign-out-button";

const DashboardPage = async () => {
  const { user } = await getUserAuthenticated();

  if (!user) {
    redirect(Routes.Authentication);
  }

  if (!user.clinic) {
    redirect(Routes.ClinicForm);
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h1>{user.email}</h1>

      <SignOutButton />
    </div>
  );
};

export default DashboardPage;
