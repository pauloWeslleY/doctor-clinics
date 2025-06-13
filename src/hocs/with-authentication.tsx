import { redirect } from "next/navigation";
import { type PropsWithChildren } from "react";

import { getUserAuthenticated } from "@/helpers/user-auth";
import { Routes } from "@/lib/routes";

interface WithAuthenticationProps {
  haveMustPlan?: boolean;
  haveMustClinic?: boolean;
}

const WithAuthentication = async ({
  children,
  haveMustClinic = false,
  haveMustPlan = false,
}: PropsWithChildren<WithAuthenticationProps>) => {
  const { user } = await getUserAuthenticated();

  if (!user) {
    redirect(Routes.Authentication);
  }

  if (haveMustClinic && !user.clinic) {
    redirect(Routes.Authentication);
  }

  if (haveMustPlan && !user.plan) {
    redirect(Routes.Plans);
  }

  return children;
};

export default WithAuthentication;
