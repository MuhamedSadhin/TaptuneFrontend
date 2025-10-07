import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useGetAllNotifications } from "@/hooks/tanstackHooks/useNotification";
import { formatDistanceToNow } from "date-fns";
import { FaUser, FaInbox } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/Loader";

export default function NotificationsPage() {
  const { data, isLoading, isError } = useGetAllNotifications();
  const [newCount, setNewCount] = useState(0);

  useEffect(() => {
    const totalCount = data?.data?.length || 0;
    if (totalCount > 0) {
      const storedCount = parseInt(
        localStorage.getItem("notificationCount") || "0",
        10
      );

      if (storedCount === 0) {
        setNewCount(totalCount);
      } else {
        setNewCount(Math.max(totalCount - storedCount, 0));
      }

      localStorage.setItem("notificationCount", totalCount.toString());
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader className="animate-spin h-8 w-8" />
      </div>
    );
  }

  if (isError) {
    return <p className="text-red-500">Failed to load notifications.</p>;
  }

  const notifications = data?.data || [];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Notifications</h2>
          <p className="text-sm text-muted-foreground">
            All Notifications are displayed here.
          </p>
        </div>
        {newCount > 0 && (
          <span className="bg-purple-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
            {newCount} New
          </span>
        )}
      </div>

      {/* Handle no notifications */}
      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <FaInbox className="text-gray-300 w-20 h-20 mb-4" />
          <p className="text-gray-500 text-lg text-center">
            No notifications available.
          </p>
        </div>
      ) : (
        <div className="w-full bg-white rounded-lg mt-8">
          <div className="divide-y divide-gray-200">
            {notifications.map((notification, index) => {
              const isNew = index < newCount; // last "newCount" are new
              return (
                <div
                  key={index}
                  className={`px-4 py-3 my-1 flex items-center sm:items-center space-x-3 ${
                    isNew ? "bg-purple-100 rounded-lg" : ""
                  }`}
                >
                  {/* Avatar with green dot */}
                  <div className="relative shrink-0">
                    <Avatar className="h-12 w-12 sm:h-14 sm:w-14">
                      <AvatarFallback>
                        <FaUser className="w-6 h-6 sm:w-8 sm:h-8 text-gray-500" />
                      </AvatarFallback>
                    </Avatar>
                    {isNew && (
                      <span className="absolute top-0 right-0 block h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-green-500 ring-2 ring-white"></span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-md max-sm:text-sm font-medium text-purple-700 break-words">
                      {notification.title}
                    </p>
                    <p className="text-sm sm:text-md text-gray-800 font-medium break-words">
                      {notification.content}
                    </p>
                    <div className="mt-1 flex flex-row sm:flex-row justify-between text-xs sm:text-sm text-gray-500">
                      <span>
                        {new Date(notification.createdAt).toLocaleDateString()}
                      </span>
                      <span>
                        {formatDistanceToNow(new Date(notification.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
