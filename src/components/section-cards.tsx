import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SectionCards({
  total,
  revenu,
  classicCount,
  vipCount
}: {
  total: string;
  revenu: string;
  classicCount: string;
  vipCount: string;
}) {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Chiffre d'affaires</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {revenu} FCFA
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              CA
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Ventes <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Montant total généré par la vente de tous les billets (VIP + Classiques).
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Billets VIP</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {parseInt(vipCount)*10000} FCFA
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingDown />
              VIP
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
           
            Nombre total :   {vipCount} tickets VIP{" "}
            <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">
            	Nombre total de billets de type VIP vendus.
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Nombre total de billets</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {total}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              total
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Somme des billets VIP et Classiques<IconTrendingUp className="size-4" />
          </div>
          
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Billet Classique</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {parseInt(classicCount)*5000} FCFA
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              Classique
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Pour {classicCount} tickets classique vendus <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Nombre total de billets de type classique vendus.</div>
        </CardFooter>
      </Card>
    </div>
  );
}
