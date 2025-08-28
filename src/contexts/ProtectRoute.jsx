
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { useAuthUser } from "@/hooks/tanstackHooks/useUserContext";

function Protect({ children, requiredRole }) {
  const navigate = useNavigate();
  const { user, loading } = useAuthUser();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth", { replace: true });
    }
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader className="animate-spin w-8 h-8 text-muted-foreground" />
      </div>
    );
  }

  if (!user) return null;

  if (requiredRole && !requiredRole.includes(user?.role)) {
    return (
      <div className="w-full h-screen flex items-center justify-center p-4 text-center">
        <p className="text-red-600 text-lg font-medium">
          Access Denied: You do not have permission to view this page.
        </p>
      </div>
    );
  }

  return children;
}

export default Protect;
