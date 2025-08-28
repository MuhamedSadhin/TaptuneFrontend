"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserTable from "@/components/adminComponents/userListComp/userTable";

export default function UserList() {
  const data = {
    totalUsers: 100,
    activeUsers: 80,
    thisMonth: 20,
    notOrdered: 10,
  }
  return (
    <div className="p-4 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              TOTAL USERS
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-violet-600">
            {data?.totalUsers || 0}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              ACTIVE USERS
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-violet-600">
            {data?.activeUsers || 0}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              THIS MONTH
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-violet-600">
            {data?.thisMonth || 0}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              NOT ORDERED
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-violet-600">
            {data?.notOrdered || 0}
          </CardContent>
        </Card>
      </div>

      {/* User Table */}
      <UserTable />
    </div>
  );
}
