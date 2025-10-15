import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { EmailForm } from "@/components/authComponents/EmailEnterForm";
import { OTPForm } from "@/components/authComponents/OtpForm";
import { ResetPasswordForm } from "@/components/authComponents/ResetPassword";
import taptuneLogo from "../../assets/logo/smalltaptuneicon.jpg";
import {
  useResetPassword,
  useSendOTP,
  useVerifyOTP,
} from "@/hooks/tanstackHooks/useAuth";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const { mutateAsync: sendOtp, isPending: isSendingOtp } = useSendOTP();
  const { mutateAsync: verifyOtp, isPending: isVerifyingOtp } = useVerifyOTP();
  const { mutateAsync: resetPassword, isPending: isResettingPassword } =
    useResetPassword();

  const handleEmailSubmit = async (enteredEmail) => {
    try {
      const response = await sendOtp({ email: enteredEmail });
      if (response.success) {
        toast.success(response.message || "OTP sent to your email.");
        setEmail(enteredEmail);
        setStep(2);
      } else {
        toast.error(response.message || "Failed to send OTP.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await sendOtp({ email });
      if (response.success) toast.success("New OTP sent.");
      else toast.error(response.message || "Failed to resend OTP.");
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred.");
    }
  };

  const handleOtpSubmit = async (otp) => {
    try {
      const response = await verifyOtp({ email, otp });
      if (response.success) {
        toast.success(response.message || "OTP verified!");
        setStep(3);
      } else {
        toast.error(response.message || "Invalid OTP.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "OTP verification failed.");
    }
  };

  const handleResetPassword = async ({ password }) => {
    try {
      if (!email || !password)
        return toast.error("Email and password required.");

      const response = await resetPassword({ email, password });
      if (response.success) {
        toast.success("Password reset successful!");
        setStep(4);
      } else {
        toast.error(response.message || "Failed to reset password.");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Error resetting password."
      );
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <EmailForm onSubmit={handleEmailSubmit} isSubmitting={isSendingOtp} />
        );
      case 2:
        return (
          <OTPForm
            email={email}
            onSubmit={handleOtpSubmit}
            onResend={handleResendOtp}
            isSubmitting={isVerifyingOtp}
          />
        );
      case 3:
        return (
          <ResetPasswordForm
            email={email}
            onSubmit={handleResetPassword}
            isSubmitting={isResettingPassword}
          />
        );
      case 4:
        return (
          <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg text-center gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-green-400">
              Success!
            </h2>
            <p className="text-white text-base sm:text-lg">
              Your password has been reset successfully.
            </p>
            <p className="text-gray-400 text-sm">
              You can now login using your new password.
            </p>
            <button
              className="mt-2 inline-block w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded transition-colors text-center"
              onClick={() => navigate("/auth")}
            >
              Go to Login
            </button>
          </div>
        );
      default:
        return (
          <EmailForm onSubmit={handleEmailSubmit} isSubmitting={isSendingOtp} />
        );
    }
  };

  return (
    <div className="bg-[#28243D] flex min-h-screen flex-col items-center justify-center gap-6 p-4">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a
          href="/"
          className="flex items-center gap-3 self-center text-xl font-bold text-white"
        >
          <img
            src={taptuneLogo}
            alt="Taptune Logo"
            className="rounded-md w-10 h-10"
          />
          Taptune.in
        </a>
        {renderStep()}
      </div>
    </div>
  );
}
