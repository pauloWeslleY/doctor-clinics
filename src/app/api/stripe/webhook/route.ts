import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { db } from "@/db";
import { usersTable } from "@/db/schema";

export const POST = async (request: Request) => {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error("Missing Stripe Secret Key");
  }

  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    throw new Error("Missing Stripe Signature");
  }

  const text = await request.text();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-05-28.basil",
  });

  // HMAC COM SHA256
  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET,
  );

  switch (event.type) {
    case "invoice.paid": {
      if (!event.data.object.id) {
        throw new Error("Missing Stripe Subscription ID");
      }

      const { parent, customer } = event.data.object as unknown as {
        customer: string;
        parent: {
          subscription_details: {
            metadata: { userId: string };
            subscription: string;
          };
        };
      };

      const subscription = parent.subscription_details.subscription;

      if (!subscription) {
        throw new Error("Missing Stripe Subscription");
      }

      const userId = parent.subscription_details.metadata.userId;

      if (!userId) {
        throw new Error("Missing userId");
      }

      await db
        .update(usersTable)
        .set({
          stripeSubscriptionId: subscription,
          stripeCustomerId: customer,
          plan: "essential",
        })
        .where(eq(usersTable.id, userId));
      break;
    }

    case "customer.subscription.deleted": {
      if (!event.data.object.id) {
        throw new Error("Missing Stripe Subscription ID");
      }

      const subscription = await stripe.subscriptions.retrieve(
        event.data.object.id,
      );

      if (!subscription) {
        throw new Error("Missing Stripe Subscription");
      }

      const userId = subscription.metadata.userId;

      if (!userId) {
        throw new Error("Missing userId");
      }

      await db
        .update(usersTable)
        .set({
          stripeSubscriptionId: null,
          stripeCustomerId: null,
          plan: null,
        })
        .where(eq(usersTable.id, userId));
    }
  }

  return NextResponse.json({
    received: true,
  });
};
