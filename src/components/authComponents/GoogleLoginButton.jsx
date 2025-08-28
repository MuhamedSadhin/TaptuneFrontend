// "use client";

// import { GoogleLogin } from "@react-oauth/google";
// import { toast } from "sonner";
// import { useNavigate } from "react-router-dom";
// import { useAuthUser } from "@/hooks/tanstackHooks/useUserContext";

// export default function GoogleLoginButton() {
//   const navigate = useNavigate();
//   const { setUser } = useAuthUser();

//   const handleSuccess = async (credentialResponse) => {
//     const idToken = credentialResponse.credential;
//     console.log("Received ID Token:", idToken);

//     try {
//       const res = await fetch("http://localhost:5000/api/auth/google", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ credential: idToken }),
//         credentials: "include",
//       });

//       const data = await res.json();

//       if (data.success) {
//         toast.success(data.message || "Google login successful");
//         if (data.user) {
//           setUser(data.user);
//         }
//         navigate("/user");
//       } else {
//         toast.error(data.message || "Google login failed. Try again.");
//       }
//     } catch (err) {
//       toast.error("Google login failed. Try again.");
//       console.error("Error:", err);
//     }
//   };

//   const handleError = () => {
//     toast.error("Google Login Failed");
//   };

//   return (
//     <GoogleLogin
//       onSuccess={handleSuccess}
//       onError={handleError}
//     />
//   );
// }







// "use client";

// import { GoogleLogin } from "@react-oauth/google";
// import { Button } from "@/components/ui/button"; // Assuming you're using a UI library like shadcn/ui
// import { toast } from "sonner";
// import { useNavigate } from "react-router-dom";
// import { useAuthUser } from "@/hooks/tanstackHooks/useUserContext";

// export default function GoogleLoginButton() {
//   const navigate = useNavigate();
//   const { setUser } = useAuthUser();

//   const handleSuccess = async (credentialResponse) => {
//     const idToken = credentialResponse.credential;
//     console.log("Received ID Token:", idToken);

//     try {
//       const res = await fetch("http://localhost:5000/api/auth/google", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ credential: idToken }),
//         credentials: "include",
//       });

//       const data = await res.json();

//       if (data.success) {
//         toast.success(data.message || "Google login successful");
//         if (data.user) {
//           setUser(data.user);
//         }
//         navigate("/user");
//       } else {
//         toast.error(data.message || "Google login failed. Try again.");
//       }
//     } catch (err) {
//       toast.error("Google login failed. Try again.");
//       console.error("Error:", err);
//     }
//   };

//   const handleError = () => {
//     toast.error("Google Login Failed");
//   };

//   return (
//     <GoogleLogin
//       onSuccess={handleSuccess}
//       onError={handleError}
//       render={(renderProps) => (
//         <Button
//           variant="outline"
//           className="w-full"
//           onClick={renderProps.onClick}
//           disabled={renderProps.disabled}
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
//             <path
//               d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
//               fill="currentColor"
//             />
//           </svg>
//           Login with Google
//         </Button>
//       )}
//     />
//   );
// }








"use client";

import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "@/hooks/tanstackHooks/useUserContext";

export default function GoogleLoginButton() {
  const navigate = useNavigate();
  const { setUser } = useAuthUser();

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      console.log("Google Login Response:", codeResponse);
      const code = codeResponse.code;
      console.log("Received Authorization Code:", code);

      try {
        const res = await fetch("http://localhost:5000/api/auth/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ credential: code }),
          credentials: "include",
        });

        const data = await res.json();

        if (data.success) {
          toast.success(data.message || "Google login successful");
          if (data.user) {
            setUser(data.user);
          }
          navigate("/user");
        } else {
          toast.error(data.message || "Google login failed. Try again.");
        }
      } catch (err) {
        toast.error("Google login failed. Try again.");
        console.error("Error:", err);
      }
    },
    onError: () => toast.error("Google Login Failed"),
    flow: "auth-code",
    scope:
      "openid email profile https://www.googleapis.com/auth/user.phonenumbers.read",
  });

  return (
    <Button variant="outline" className="w-full" onClick={() => login()}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="48px"
        height="48px"
      >
        <path
          fill="#FFC107"
          d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 s5.373-12,12-12c3.059,0,5.842,1.153,7.961,3.039l5.657-5.657C34.046,6.676,29.268,4,24,4c-11.046,0-20,8.954-20,20 s8.954,20,20,20c11.046,0,20-8.954,20-20C44,22.659,43.862,21.35,43.611,20.083z"
        />
        <path
          fill="#FF3D00"
          d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.153,7.961,3.039 l5.657-5.657C34.046,6.676,29.268,4,24,4C16.318,4,9.396,8.337,6.306,14.691z"
        />
        <path
          fill="#4CAF50"
          d="M24,44c5.166,0,9.86-1.977,13.409-5.182l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.315-11.283-7.946l-6.522,5.025C9.367,39.556,16.161,44,24,44z"
        />
        <path
          fill="#1976D2"
          d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.094,5.58 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C39.266,36.798,44,30.849,44,24C44,22.659,43.862,21.35,43.611,20.083z"
        />
      </svg>
      Login with Google
    </Button>
  );
}