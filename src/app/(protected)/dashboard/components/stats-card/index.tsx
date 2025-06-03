import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import getStatCard from "./get-stats-card";
import { type StatsCardProps } from "./stats-card.type";

const StatsCard = (props: StatsCardProps) => {
  const stats = getStatCard(props);

  return (
    <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card key={stat.title} className="gap-2">
            <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
              <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                <Icon className="text-primary h-4 w-4" />
              </div>
              <CardTitle className="text-muted-foreground text-sm font-medium">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsCard;
