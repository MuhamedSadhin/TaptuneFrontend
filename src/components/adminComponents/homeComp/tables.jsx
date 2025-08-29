"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChartAreaGradient } from "./ChartComp";
import { useGetOrderAndUserForAdminHomePage } from "@/hooks/tanstackHooks/useOrder";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

export default function DashboardSection() {
  const { data, isLoading, isError } = useGetOrderAndUserForAdminHomePage();
  const navigate = useNavigate();
  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-64">
        <p className="text-muted-foreground">Loading dashboard data...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center w-full h-64">
        <p className="text-red-500">Failed to fetch dashboard data.</p>
      </div>
    );
  }

  const latestOrders = data?.data?.lastCardOrders || [];
  const latestUsers = data?.data?.lastUsers || [];

  return (
    <div className="flex flex-col lg:flex-row mt-5 gap-6">
      <div className="flex flex-col gap-6 w-full">
        {/* Latest Orders */}
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Latest Orders</CardTitle>
              <CardDescription>New orders list</CardDescription>
            </div>
            <Button
              variant="ghost"
              className="bg-purple-500 text-white hover:bg-purple-600 "
              onClick={() => navigate(`/admin/card-order`)}
            >
              View All
            </Button>
          </CardHeader>

          <CardContent className="overflow-x-auto">
            {latestOrders.length > 0 ? (
              <Table>
                <TableBody>
                  {latestOrders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell className="flex items-center gap-3 max-w-[220px]">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {order.userId?.name?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <span
                          className="font-medium truncate"
                          title={order.userId?.email}
                        >
                          {order.userId?.email}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        {(() => {
                          let badgeStyles = "";
                          switch (order.status) {
                            case "Pending":
                              badgeStyles = "bg-red-200 text-red-800";
                              break;
                            case "Confirmed":
                              badgeStyles = "bg-blue-100 text-blue-700";
                              break;
                            case "Design Completed":
                              badgeStyles = "bg-yellow-100 text-yellow-700";
                              break;
                            case "Delivered":
                              badgeStyles = "bg-green-100 text-green-700";
                              break;
                            default:
                              badgeStyles = "bg-gray-100 text-gray-700";
                          }
                          return (
                            <Badge className={badgeStyles}>
                              {order.status}
                            </Badge>
                          );
                        })()}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground text-sm">
                        {new Date(order.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-sm text-muted-foreground">
                No recent orders found.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Latest Users */}
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between ">
            <div>
              <CardTitle>Latest Users</CardTitle>
              <CardDescription>New users list</CardDescription>
            </div>
            <Button
              variant="ghost"
              className="bg-purple-500 text-white hover:bg-purple-600 "
              onClick={() => navigate(`/admin/user-list`)}
            >
              View All
            </Button>
          </CardHeader>

          <CardContent className="overflow-x-auto">
            {latestUsers.length > 0 ? (
              <Table>
                <TableBody>
                  {latestUsers.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell className="flex items-center gap-3 max-w-[180px]">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span
                          className="font-medium truncate"
                          title={user.name}
                        >
                          {user.name}
                        </span>
                      </TableCell>
                      <TableCell
                        className="truncate max-w-[200px]"
                        title={user.email}
                      >
                        {user.email}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground text-sm">
                        {formatDistanceToNow(new Date(user.createdAt), {
                          addSuffix: true,
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-sm text-muted-foreground">
                No recent users found.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Chart Section */}
      <div className="w-full lg:max-w-2xl">
        <ChartAreaGradient />
      </div>
    </div>
  );
}
