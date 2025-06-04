import { loadStripe } from "@stripe/stripe-js";
import { useAction } from "next-safe-action/hooks";

import { createStripeCheckout } from "@/actions/create-stripe-checkout";

const useSubscriptionPlanCard = () => {
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

  const handleCreateStripeCheckout = () => {
    createStripeCheckoutAction.execute();
  };

  return {
    handleCreateStripeCheckout,
  };
};

export default useSubscriptionPlanCard;
