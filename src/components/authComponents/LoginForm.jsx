import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useLogin } from "@/hooks/tanstackHooks/useAuth";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthUser } from "@/hooks/tanstackHooks/useUserContext";
import GoogleLoginButton from "./GoogleLoginButton";
import { HiChevronLeft } from "react-icons/hi2";

export function LoginForm({ onSwitch }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { setUser } = useAuthUser();

  const { mutate, isPending } = useLogin();

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email.";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    mutate(
      {
        email: formData.email,
        password: formData.password,
      },
      {
        onSuccess: (res) => {
          if (res.success) {
            toast.success("Login successful");
            if (res.user) {
              setUser?.(res.user);
            }
            navigate("/user");
          } else {
            toast.error(res.message || "Login failed. Try again.");
          }
        },
        onError: (error) => {
          const message =
            error?.response?.data?.message || "Login failed. Try again.";
          toast.error(message);
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <Card className={"bg-white"}>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login with your email and password</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div className="grid gap-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button
                  type="button"
                  className="font-medium text-sm text-purple-500 hover:text-purple-700 underline-offset-4 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-700"
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin mx-auto" />
              ) : (
                "Login"
              )}
            </Button>
          </form>

          <div className="flex justify-center mt-3 mb-5">
            <GoogleLoginButton />
          </div>
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={onSwitch}
              className=" underline underline-offset-4 text-purple-500 hover:text-purple-700 font-medium"
            >
              Sign up
            </button>
          </div>
        </CardContent>
      </Card>
      <div className="">
      <div className=" text-gray-400 text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue , you agree to our{" "}
        <a href="/terms">Terms of Service</a> and{" "}
        <a href="/privacy">Privacy Policy</a>.
      </div>
      <div className="flex justify-center mt-3">
        <Link
          to="/"
          className="inline-flex items-center text-gray-400 hover:text-gray-200 
                 transition-colors duration-200 text-sm font-medium"
        >
          <HiChevronLeft className="w-4 h-4  mr-1" />
          <span>Back to home</span>
        </Link>
        </div>
        </div>
    </div>
  );
}
