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
import { HiChevronLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";
import Loader from "../ui/Loader";
import { Loader2Icon } from "lucide-react";

export function EmailForm({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      // Call parent submit handler or API
      await onSubmit(email);
      setEmail("");
    } catch (err) {
      toast.error(err?.message || "Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <Card className="bg-white">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Enter your email</CardTitle>
          <CardDescription>Provide your email to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2Icon className="h-5 w-5 animate-spin text-white" />
              ) : (
                "Continue"
              )}
            </Button>
          </form>
          <div className="text-center text-sm mt-4">
            By continuing, you agree to our{" "}
            <a className="underline text-purple-500" href="/terms">
              Terms of Service
            </a>{" "}
            and{" "}
            <a className="underline text-purple-500" href="/privacy">
              Privacy Policy
            </a>
            .
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center mt-3">
        <Link
          to="/"
          className="inline-flex items-center text-gray-400 hover:text-gray-200 transition-colors duration-200 text-sm font-medium"
        >
          <HiChevronLeft className="w-4 h-4 mr-1" />
          <span>Back to home</span>
        </Link>
      </div>
    </div>
  );
}
