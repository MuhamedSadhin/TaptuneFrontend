"use client";

import { TrendingUp, Loader2 } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetChartData } from "@/hooks/tanstackHooks/useOrder";

export const description = "An area chart with gradient fill";

const chartConfig = {
  users: {
    label: "Users",
    color: "#7C3AED", // Tailwind purple-600
  },
  cardOrders: {
    label: "Card Orders",
    color: "#A78BFA", // Tailwind purple-400
  },
};

export function ChartAreaGradient() {
  const { data, isLoading, isError } = useGetChartData();

  // Fallback empty data if API fails
  const chartData = data?.data || [];

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>User - Card Order   Chart</CardTitle>
        <CardDescription>
          Showing total users and card orders for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[300px] flex items-center justify-center">
        {isLoading ? (
          // Centered loader
          <Loader2 className="h-10 w-10 animate-spin text-purple-600" />
        ) : isError ? (
          <p className="text-red-500">Failed to load chart data</p>
        ) : (
          <ChartContainer config={chartConfig} className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <defs>
                  <linearGradient id="fillUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-users)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-users)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                  <linearGradient
                    id="fillCardOrders"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="var(--color-cardOrders)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-cardOrders)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="users"
                  type="monotone"
                  fill="url(#fillUsers)"
                  fillOpacity={0.4}
                  stroke="var(--color-users)"
                  stackId="a"
                />
                <Area
                  dataKey="cardOrders"
                  type="monotone"
                  fill="url(#fillCardOrders)"
                  fillOpacity={0.4}
                  stroke="var(--color-cardOrders)"
                  stackId="a"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              Last 6 months trend
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
