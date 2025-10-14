import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { EmailForm } from "@/components/authComponents/EmailEnterForm";
import { OTPForm } from "@/components/authComponents/OtpForm";
import { ResetPasswordForm } from "@/components/authComponents/ResetPassword";
import taptuneLogo from "../../assets/logo/smalltaptuneicon.jpg";
import { useResetPassword, useSendOTP, useVerifyOTP } from "@/hooks/tanstackHooks/useAuth";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const { mutateAsync: sendOtp, isPending: isSendingOtp } = useSendOTP();
  const { mutateAsync: verifyOtp, isPending: isVerifyingOtp } = useVerifyOTP();
  const { mutateAsync: resetPassword, isPending: isResettingPassword } =
    useResetPassword();

const handleEmailSubmit = async (enteredEmail) => {
  console.log("Submitting email for OTP:", enteredEmail);
  try {
    const response = await sendOtp({ email: enteredEmail });
    if (response.success) {
      toast.success(response.message || "An OTP has been sent to your email.");
      setEmail(enteredEmail);
      setStep(2);
    } else {
      toast.error(response.message || "Failed to send OTP. Please try again.");
    }
  } catch (error) {
    toast.error(error.message || "An unexpected error occurred.");
  }
};


  const handleResendOtp = async () => {
    try {
      const response = await sendOtp({ email });
      if (response.success) {
        toast.success("A new OTP has been sent.");
      } else {
        toast.error(response.message || "Failed to resend OTP.");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while resending.");
    }
  };

  const handleOtpSubmit = async (otp) => {
    try {
      const response = await verifyOtp({ email, otp });
      if (response.success) {
        toast.success(response.message || "OTP verified successfully!");
        setStep(3);
      } else {
        return Promise.reject(new Error(response.message || "Invalid OTP."));
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

    const handleResetPassword = async ({ password }) => {
        console.log("Resetting password for email:", email);
        console.log("New password:", password);
    try {
      if (!email || !password) {
        toast.error("Email and password are required");
        return;
      }
      const response = await resetPassword({ email, password });
      if (response.success) setStep(4);
      else toast.error(response.message || "Failed to reset password.");
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred.");
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
            onClick={()=>{navigate('/auth')}}
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
