




"use client";

import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "@/hooks/tanstackHooks/useUserContext";
import { useState } from "react";

export default function GoogleLoginButton() {
  const navigate = useNavigate();
  const { setUser } = useAuthUser();
  const [loading, setLoading] = useState(false);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      setLoading(true);
      const code = codeResponse.code;

      try {
        const res = await fetch(`${BASE_URL}api/auth/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ credential: code }),
          credentials: "include",
        });

        const data = await res.json();

        if (data.success) {
          toast.success(data.message || "Google login successful");
          if (data.user) setUser(data.user);
          navigate("/user");
        } else {
          toast.error(data.message || "Google login failed. Try again.");
        }
      } catch (err) {
        toast.error("Google login failed. Try again.");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    },
    onError: () => toast.error("Google Login Failed"),
    flow: "auth-code",
    scope: "openid email profile",
  });

  return (
    <div className="flex justify-center items-center w-full">
      <Button
        variant="outline"
        className="w-full max-w-sm flex items-center justify-center gap-2"
        onClick={() => login()}
        disabled={loading}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            <span>Signing in...</span>
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="24px"
              height="24px"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8
                c-6.627,0-12-5.373-12-12 s5.373-12,12-12c3.059,0,
                5.842,1.153,7.961,3.039l5.657-5.657C34.046,
                6.676,29.268,4,24,4c-11.046,0-20,
                8.954-20,20 s8.954,20,20,20c11.046,0,
                20-8.954,20-20C44,22.659,43.862,
                21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,
                15.108,18.961,12,24,12c3.059,0,
                5.842,1.153,7.961,3.039 l5.657-5.657C34.046,
                6.676,29.268,4,24,4C16.318,4,
                9.396,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,
                9.86-1.977,13.409-5.182l-6.19-5.238C29.211,
                35.091,26.715,36,24,36 c-5.202,0-9.619-3.315-11.283-7.946l-6.522,
                5.025C9.367,39.556,16.161,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,
                2.237-2.231,4.166-4.094,5.58 c0.001-0.001,
                0.002-0.001,0.003-0.002l6.19,5.238C39.266,
                36.798,44,30.849,44,24C44,22.659,
                43.862,21.35,43.611,20.083z"
              />
            </svg>
            <span>Login with Google</span>
          </>
        )}
      </Button>
    </div>
  );
}
