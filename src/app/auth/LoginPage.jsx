
import { LoginForm } from "@/components/authComponents/LoginForm";
import { SignupForm } from "@/components/authComponents/SignupForm";
import { useAuthUser } from "@/hooks/tanstackHooks/useUserContext";
import { GalleryVerticalEnd } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import taptuneLogo from "../../assets/logo/smalltaptuneicon.jpg";
import Loader from "@/components/ui/Loader";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { user, loading } = useAuthUser();

  useEffect(() => {
    if (!loading && user) {
      if (user.role === "admin" || user.role === "Admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/user", { replace: true });
      }
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-600">
       <Loader/>
      </div>
    );
  }
  return (
    <div className=" bg-raisin-black-500 flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a
          href="#"
          className="flex items-center gap-2 self-center font-medium text-white-400"
        >
          <div className="bg-primary text-primary-foreground flex  items-center justify-center rounded-md">
            <img src={taptuneLogo} className="rounded-md size-14" />
          </div>
          Taptune.in
        </a>
        {isLogin ? (
          <LoginForm onSwitch={() => setIsLogin(false)} />
        ) : (
          <SignupForm onSwitch={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
}
