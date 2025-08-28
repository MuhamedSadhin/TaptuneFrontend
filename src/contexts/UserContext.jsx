
import { useGetUser } from "@/hooks/tanstackHooks/useAuth";
import React, { createContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { data, isLoading, isError } = useGetUser();

  useEffect(() => {
    if (!isLoading) {
      if (data?.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
      setLoading(false);
    }
  }, [data, isLoading]);

  return (
    <UserContext.Provider value={{ user, setUser, loading, isError }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
