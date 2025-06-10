"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
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
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])


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