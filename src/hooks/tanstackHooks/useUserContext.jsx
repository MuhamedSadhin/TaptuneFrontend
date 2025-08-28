import UserContext from "@/contexts/UserContext";
import { useContext } from "react";

export const useAuthUser = () => useContext(UserContext);
