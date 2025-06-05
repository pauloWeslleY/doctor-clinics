import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";

import { createStripeCheckout } from "@/actions/create-stripe-checkout";

interface UseSubscriptionPlanCardProps {
  active?: boolean;
  userEmail?: string;
}

const useSubscriptionPlanCard = ({
  active,
  userEmail,
}: UseSubscriptionPlanCardProps) => {
  const router = useRouter();

  const createStripeCheckoutAction = useAction(createStripeCheckout, {
    onSuccess: async ({ data }) => {
      if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
        throw new Error("Stripe secret key nao encontrada");
      }
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      );
      if (!stripe) {
        throw new Error("Stripe nao encontrada");
      }

      if (!data?.sessionId) {
        throw new Error("Stripe nao encontrada");
      }

      await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });
    },
  });

  const buttonText = active ? "Gerenciar assinatura" : "Fazer assinatura";

  const handleCreateStripeCheckout = () => {
    createStripeCheckoutAction.execute();
  };

  const handleManagerPlan = () => {
    router.push(
      `${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL}?prefilled_email=${userEmail}`,
    );
  };

  const handleSubscriptionPlan = () => {
    const activePlain = active === undefined ? false : active;

    if (activePlain) {
      handleManagerPlan();
    } else {
      handleCreateStripeCheckout();
    }
  };

  return {
    buttonCreateStripeCheckoutText: buttonText,
    isPendingCreateStripeCheckoutAction: createStripeCheckoutAction.isExecuting,
    handleSubscriptionPlan,
  };
};

export default useSubscriptionPlanCard;
