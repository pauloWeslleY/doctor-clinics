import {
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutHeaderContent,
  LayoutHeaderDescription,
  LayoutHeaderTitle,
  LayoutRoot,
} from "@/components/root-layout";

import SubscriptionPlanCard from "./components/subscription-plan-card";

const Subscription = () => {
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
        <SubscriptionPlanCard />
      </LayoutContent>
    </LayoutRoot>
  );
};

export default Subscription;
