"use client";

import { CheckCircle2Icon, Loader2Icon } from "lucide-react";
import { type ComponentProps } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import useSubscriptionPlanCard from "./use-subscription-plan-card";

interface SubscriptionPlanCardProps extends ComponentProps<"div"> {
  active?: boolean;
  userEmail?: string;
}

const features = [
  "Cadastro de até 3 médicos",
  "Agendamentos ilimitados",
  "Métricas básicas",
  "Cadastro de pacientes",
  "Confirmação manual",
  "Suporte via e-mail",
];

const SubscriptionPlanCard = ({
  active,
  userEmail,
  className,
}: SubscriptionPlanCardProps) => {
  const {
    handleSubscriptionPlan,
    buttonCreateStripeCheckoutText,
    isPendingCreateStripeCheckoutAction,
  } = useSubscriptionPlanCard({ active, userEmail });

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-900">Essential</h3>
          {active && (
            <Badge className="bg-green-100 text-green-600 hover:bg-green-300">
              Atual
            </Badge>
          )}
        </div>
        <p className="text-gray-600">
          Para profissionais autônomos ou pequenas clínicas médicas.
        </p>
        <div className="mt-2 flex items-baseline">
          <span className="text-3xl font-bold text-gray-900">R$59</span>
          <span className="ml-1 text-gray-600">/ mês</span>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4 border-t border-gray-200 pt-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0">
                <CheckCircle2Icon className="h-5 w-5 text-green-500" />
              </div>
              <p className="ml-3 text-gray-600">{feature}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Button
            className="w-full"
            variant="outline"
            onClick={handleSubscriptionPlan}
            disabled={isPendingCreateStripeCheckoutAction}
          >
            {isPendingCreateStripeCheckoutAction ? (
              <Loader2Icon className="mr-1 h-4 w-4 animate-spin" />
            ) : (
              buttonCreateStripeCheckoutText
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionPlanCard;
