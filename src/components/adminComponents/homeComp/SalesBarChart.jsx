"use client";

import { TrendingUp, Loader2 } from "lucide-react";
import {
  Bar,
  BarChart,
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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetChartData } from "@/hooks/tanstackHooks/useOrder";
import { ReferralCard } from "./MeetingCard";


export const description =
  "A stacked bar chart displaying user and order growth";

// 🎨 Chart configuration (colors + labels)
const chartConfig = {
  users: {
    label: "Users",
    color: "#d7a4f9", // Light purple
  },
  cardOrders: {
    label: "Card Orders",
    color: "#b64df3", // Primary purple
  },
};

export function SalesBarChart({user}) {
  const { data, isLoading, isError } = useGetChartData();

  const chartData = data?.data || [];

  return (
    <div className="flex flex-col-reverse items-center w-full  mt-4">
      <Card className="w-full max-w-2xl mt-4">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Monthly Growth Overview
          </CardTitle>
          <CardDescription>Last 6 months statistics</CardDescription>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-72">
              <Loader2 className="animate-spin w-6 h-6 text-muted-foreground" />
            </div>
          ) : isError ? (
            <div className="text-center text-red-500 py-12">
              Failed to load chart data
            </div>
          ) : chartData.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
              No data available
            </div>
          ) : (
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 0, left: -10, bottom: 0 }}
                >
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <ChartLegend content={<ChartLegendContent />} />

                  {/* Stacked Bars */}
                  <Bar
                    dataKey="cardOrders"
                    stackId="a"
                    fill={chartConfig.cardOrders.color}
                    radius={[0, 0, 4, 4]}
                  />
                  <Bar
                    dataKey="users"
                    stackId="a"
                    fill={chartConfig.users.color}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          )}
        </CardContent>

        {!isLoading && !isError && chartData.length > 0 && (
          <CardFooter className="flex flex-col items-start gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium">
              Trending up by <span className="text-green-500">5.2%</span> this
              month
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-muted-foreground text-xs">
              Showing total users and card orders for the last 6 months
            </div>
          </CardFooter>
        )}
      </Card>
      <ReferralCard user={user} className=" max-w-2xl" />
    </div>
  );
}
