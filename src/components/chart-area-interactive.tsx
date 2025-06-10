"use client"

import * as React from "react"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart"
import PaymentChart from "./Paiements"
import { Button } from "./ui/button"
import { IconDatabaseExport } from "@tabler/icons-react"

export const description = "An interactive area chart"



const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {


  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Courbe des paiements </CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
           Représentation graphique de l’évolution des ventes dans le temps
          </span>
          <span className="@[540px]/card:hidden">Représentation graphique de l’évolution des ventes dans le temps</span>
        </CardDescription>
        <CardAction>
         <Button variant={"outline"} > <IconDatabaseExport/>  Export</Button>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
        <PaymentChart/>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}