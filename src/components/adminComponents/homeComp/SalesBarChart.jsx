"use client";

import { TrendingUp } from "lucide-react";
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { EnquiryCard } from "./MeetingCard";

export const description = "A bar chart";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#b64df9",
  },
};

export function SalesBarChart() {
  return (
    <div className="flex flex-col items-center w-full gap-4">
      {/* Card wrapper with max width 2xl */}
      <Card className="w-full max-w-2xl mt-4">
        <CardHeader>
          <CardTitle>Bar Chart</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>

        <CardContent>
          <ChartContainer config={chartConfig}>
            {/* Responsive chart container */}
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={chartData}
                margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar
                  dataKey="desktop"
                  fill="var(--color-desktop)"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>

        <CardFooter className="flex flex-col items-start gap-1 text-sm">
          <div className="flex items-center gap-2 font-medium">
            Trending up by 5.2% this month{" "}
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <div className="text-muted-foreground text-xs">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>

      {/* Meeting card below the chart */}
      <EnquiryCard className=" max-w-2xl mt-6" />
    </div>
  );
}
