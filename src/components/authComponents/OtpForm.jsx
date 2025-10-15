import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";

export function OTPForm({ onSubmit, email }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value.replace(/\D/g, ""); // only numbers
    setOtp(newOtp);
    setError("");

    // Move focus to next input
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const validate = () => {
    if (otp.some((digit) => digit === "")) {
      setError("OTP must be 6 digits.");
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
      await onSubmit(otp.join(""));
      setOtp(["", "", "", "", "", ""]);
      inputsRef.current[0].focus();
    } catch (err) {
      toast.error(err?.message || "Failed to verify OTP.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full max-w-md mx-auto">
      <Card className="bg-white">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Enter OTP</CardTitle>
          <CardDescription>
            We sent a 6-digit code to{" "}
            <span className="font-medium">{email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="otp">OTP</Label>
              <div className="flex gap-2 justify-center">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    ref={(el) => (inputsRef.current[index] = el)}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-12 h-12 border border-gray-300 rounded-md text-center text-lg font-medium focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                  />
                ))}
              </div>
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2Icon className="h-5 w-5 animate-spin text-white" />
              ) : (
                "Verify OTP"
              )}
            </Button>
          </form>
          <div className="text-center text-sm mt-4">
            Didn't receive the code?{" "}
            <button
              type="button"
              onClick={() => toast.success("OTP resent!")}
              className="underline text-purple-500 hover:text-purple-700 font-medium"
            >
              Resend OTP
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
