import { loadStripe } from "@stripe/stripe-js";
import { useAction } from "next-safe-action/hooks";

import { createStripeCheckout } from "@/actions/create-stripe-checkout";

const useSubscriptionPlanCard = (active?: boolean) => {
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
    const activePlain = active === undefined ? false : active;
    if (activePlain) return;
    createStripeCheckoutAction.execute();
  };

  return {
    buttonCreateStripeCheckoutText: buttonText,
    isPendingCreateStripeCheckoutAction: createStripeCheckoutAction.isExecuting,
    handleCreateStripeCheckout,
  };
};

export default useSubscriptionPlanCard;
