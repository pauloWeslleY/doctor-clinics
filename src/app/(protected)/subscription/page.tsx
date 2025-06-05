import { redirect } from "next/navigation";

import {
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutHeaderContent,
  LayoutHeaderDescription,
  LayoutHeaderTitle,
  LayoutRoot,
} from "@/components/root-layout";
import { getUserAuthenticated } from "@/helpers/user-auth";
import { Routes } from "@/lib/routes";

import SubscriptionPlanCard from "./components/subscription-plan-card";

const Subscription = async () => {
  const { user, session } = await getUserAuthenticated();

  if (!session) {
    redirect(Routes.Authentication);
  }

  if (!user?.clinic) {
    redirect(Routes.ClinicForm);
  }

  return (
    <LayoutRoot>
      <LayoutHeader>
        <LayoutHeaderContent>
          <LayoutHeaderTitle>Assinaturas</LayoutHeaderTitle>
          <LayoutHeaderDescription>
            Gerencie a sua assinatura.
          </LayoutHeaderDescription>
        </LayoutHeaderContent>
        <LayoutActions></LayoutActions>
      </LayoutHeader>
      <LayoutContent>
        <SubscriptionPlanCard
          active={session.user.plan === "essential"}
          userEmail={user.email}
        />
      </LayoutContent>
    </LayoutRoot>
  );
};

export default Subscription;
