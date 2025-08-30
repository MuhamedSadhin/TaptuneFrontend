// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import "react-phone-input-2/lib/style.css";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import GoogleLoginButton from "./GoogleLoginButton";
// import { useSignup } from "@/hooks/tanstackHooks/useAuth"; // your mutation hook
// import { toast } from "sonner";
// import { Loader2 } from "lucide-react";
// import PhoneInput from "react-phone-input-2";

// export function SignupForm({ onSwitch }) {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phoneNumber: "",
//     password: "",
//     confirmPassword: "",
//     terms: false,
//   });

//   const {mutate:signupMutation, isPending} = useSignup();

//   const handleChange = (e) => {
//     const { id, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [id]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }

//     if (!formData.terms) {
//       toast.error("You must agree to Terms & Privacy Policy");
//       return;
//     }

//     signupMutation(
//       {
//         name: formData.name,
//         email: formData.email,
//         phoneNumber: formData.phoneNumber,
//         password: formData.password,
//       },
//       {
//         onSuccess: (res) => {
//           if (res.success) {
//             toast.success("Account created successfully!");
//             onSwitch?.();
//           } else {
//             toast.error(res.message || "Something went wrong");
//           }
//         },
//         onError: (error) => {
//           toast.error(error?.response?.data?.message || "Signup failed");
//         },
//       }
//     );
//   };

//   return (
//     <div className="flex flex-col gap-6">
//       <Card>
//         <CardHeader className="text-center">
//           <CardTitle className="text-xl">Create account</CardTitle>
//           <CardDescription>Join TapTune and start networking</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit}>
//             <div className="grid gap-6">
//               <div className="grid gap-4">
//                 <div className="grid gap-2">
//                   <Label htmlFor="name">Full name</Label>
//                   <Input
//                     id="name"
//                     type="text"
//                     placeholder="John Doe"
//                     required
//                     value={formData.name}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="grid gap-2">
//                   <Label htmlFor="email">Email address</Label>
//                   <Input
//                     id="email"
//                     type="email"
//                     placeholder="john@example.com"
//                     required
//                     value={formData.email}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="grid gap-2">
//                   <Label htmlFor="phoneNumber">Phone number</Label>
//                   <Input
//                     id="phoneNumber"
//                     type="tel"
//                     placeholder="+1 (555) 123-4567"
//                     required
//                     value={formData.phoneNumber}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="grid gap-2 md:grid-cols-2 md:gap-6">
//                   <div className="grid gap-2">
//                     <Label htmlFor="password">Password</Label>
//                     <Input
//                       id="password"
//                       type="password"
//                       placeholder="Password"
//                       required
//                       value={formData.password}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="grid gap-2">
//                     <Label htmlFor="confirmPassword">Confirm password</Label>
//                     <Input
//                       id="confirmPassword"
//                       type="password"
//                       placeholder="Confirm"
//                       required
//                       value={formData.confirmPassword}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>

//                 <div className="flex items-start space-x-2 text-sm text-muted-foreground">
//                   <input
//                     type="checkbox"
//                     id="terms"
//                     checked={formData.terms}
//                     onChange={handleChange}
//                     className="mt-1"
//                   />
//                   <label htmlFor="terms" className="text-left">
//                     I agree to the{" "}
//                     <a
//                       href="#"
//                       className="underline underline-offset-4 hover:text-primary"
//                     >
//                       Terms
//                     </a>{" "}
//                     and{" "}
//                     <a
//                       href="#"
//                       className="underline underline-offset-4 hover:text-primary"
//                     >
//                       Privacy Policy
//                     </a>
//                     .
//                   </label>
//                 </div>

//                 <Button type="submit" className="w-full" disabled={isPending}>
//                   {isPending ? (
//                     <div className="flex items-center justify-center">
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       Signing up...
//                     </div>
//                   ) : (
//                     "Sign up"
//                   )}
//                 </Button>
//               </div>
//             </div>
//           </form>

//           <div className="flex justify-center mt-3 mb-5">
//             <GoogleLoginButton />
//           </div>
//           <div className="text-center text-sm">
//             Already have an account?{" "}
//             <button
//               type="button"
//               onClick={onSwitch}
//               className="underline underline-offset-4 text-primary"
//             >
//               Login
//             </button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }



"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import "react-phone-input-2/lib/style.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GoogleLoginButton from "./GoogleLoginButton";
import { useSignup } from "@/hooks/tanstackHooks/useAuth";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import { Link } from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi2";

export function SignupForm({ onSwitch }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const { mutate: signupMutation, isPending } = useSignup();

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  // ✅ Handle phone input, remove `+` symbol
  const handlePhoneChange = (value, country) => {
    const cleanValue = value.replace(/^\+/, ""); // remove leading +
    setFormData((prev) => ({
      ...prev,
      phoneNumber: cleanValue,
    }));
  };

  // ✅ Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.phoneNumber) {
      toast.error("Please fill all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!formData.terms) {
      toast.error("You must agree to Terms & Privacy Policy");
      return;
    }
    console.log("Submitting signup with data:", formData);
    signupMutation(
      {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      },
      {
        onSuccess: (res) => {
          if (res.success) {
            toast.success("Account created successfully!");
            onSwitch?.();
          } else {
            toast.error(res.message || "Something went wrong");
          }
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message || "Signup failed");
        },
      }
    );
  };

  return (
    <div className="flex flex-col ">
      <Card className="">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-semibold">
            Create account
          </CardTitle>
          <CardDescription>Join TapTune and start networking</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone number</Label>
              <PhoneInput
                country={"in"}
                value={formData.phoneNumber}
                onChange={handlePhoneChange}
                inputProps={{
                  name: "phoneNumber",
                  required: true,
                  id: "phoneNumber",
                }}
                containerClass="w-full"
                inputClass="!w-full !h-11 !border !border-input !rounded-md !px-10 !text-sm"
                buttonClass="!border !border-input !rounded-l-md"
                dropdownClass="max-h-60 overflow-y-auto"
              />
            </div>

            {/* Password + Confirm */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start space-x-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                id="terms"
                checked={formData.terms}
                onChange={handleChange}
                className="mt-1"
              />
              <label htmlFor="terms" className="text-left">
                I agree to the{" "}
                <a
                  href="#"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Terms
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Privacy Policy
                </a>
                .
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-700"
              disabled={isPending}
            >
              {isPending ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing up...
                </div>
              ) : (
                "Sign up"
              )}
            </Button>
          </form>

          {/* Google Login */}
          <div className="flex justify-center mt-5">
            <GoogleLoginButton />
          </div>

          {/* Switch to Login */}
          <div className="text-center text-sm mt-3">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onSwitch}
              className="underline underline-offset-4  text-purple-500 hover:text-purple-700 font-medium"
            >
              Login
            </button>
          </div>
        </CardContent>
      </Card>
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
  );
}
