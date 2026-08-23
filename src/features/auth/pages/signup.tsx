import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Eye, EyeOff } from "lucide-react";
import type { SignUpFormData } from "@/types/auth";
import { useSignUp } from "@/hooks/useMutation";
import { toast } from "sonner"
import { MutationOverlay } from '@/components/ui/mutation-overlay'

const signUpSchema = yup.object().shape({
  userName: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
  });

  const [loading, setLoading] = useState(false);
  const [minimumCharacter, setMinimumCharacter] = useState(false);
  const [uppercase, setUpperCase] = useState(false);
  const [number, setNumber] = useState(false);
  const [specialCharacter, setSpecialCharacter] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const passwordValue = watch("password", "");
  const signUpMutation = useSignUp();
  const navigate = useNavigate();

  useEffect(() => {
    function passwordChecklist(input: string) {
      const str = String(input);
      str.length >= 8 ? setMinimumCharacter(true) : setMinimumCharacter(false);
      setNumber(/\d/.test(str));
      setSpecialCharacter(/[^A-Za-z0-9]/.test(str));
      setUpperCase(/[A-Z]/.test(str));
    }
    passwordChecklist(passwordValue);
  }, [passwordValue]);

  const onSubmit = async (data: SignUpFormData) => {
    setLoading(true);
    try {
      await signUpMutation.mutateAsync(data);
      toast.success("Registration successful! Please log in to view your dashboard.");
      navigate("/login");
    } catch (error: any) {
      const message = error.userMessage || error.response?.data?.message || error.message;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 font-poppins h-[100dvh]">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md my-auto max-h-[90vh] overflow-y-auto">
        <div className="relative flex items-center mb-6">
          <Link to="/" className="absolute left-0 text-gray-600 hover:text-black transition-colors cursor-pointer">
            <ArrowLeft size={20} />
          </Link>
          <h2 className="text-2xl font-bold text-center text-gray-800 w-full">
            Create an Account
          </h2>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              {...register("userName")}
              className={`w-full px-4 py-2 border ${
                errors.userName ? "border-red-500" : "border-gray-300"
              } rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all`}
              placeholder="your_username"
            />
            {errors.userName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.userName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className={`w-full px-4 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all`}
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className={`w-full px-4 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all pr-10`}
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Checklist */}
          <div className="flex flex-col gap-3 py-2">
            <p className="text-gray-700 text-sm font-medium mb-1">
              Your Password must contain:
            </p>

            <div
              className={`flex items-center gap-3 ${
                minimumCharacter ? "text-gray-700" : "text-gray-400"
              }`}
            >
              {minimumCharacter ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <g fill="none">
                    <path
                      fill="#78eb7b"
                      d="M1.987 13.704a1.084 1.084 0 0 0 0 1.534l5.203 5.204c.424.423 1.11.423 1.534 0l13.289-13.29a1.084 1.084 0 0 0 0-1.533l-2.06-2.06a1.084 1.084 0 0 0-1.533 0L7.957 14.022L5.58 11.644a1.085 1.085 0 0 0-1.534 0z"
                    />
                    <path
                      fill="#c9f7ca"
                      d="M7.957 17.167L20.76 4.365l-.809-.809a1.085 1.085 0 0 0-1.534 0L7.957 14.022L5.58 11.644a1.084 1.084 0 0 0-1.534 0l-.809.809z"
                    />
                    <path
                      stroke="#191919"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M1.987 13.704a1.084 1.084 0 0 0 0 1.534l5.203 5.204c.424.423 1.11.423 1.534 0l13.289-13.29a1.084 1.084 0 0 0 0-1.533l-2.06-2.06a1.084 1.084 0 0 0-1.533 0L7.957 14.022L5.58 11.644a1.085 1.085 0 0 0-1.534 0z"
                      strokeWidth="1"
                    />
                  </g>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              )}
              <span className="text-sm">At least 8 characters</span>
            </div>

            <div
              className={`flex items-center gap-3 ${
                uppercase ? "text-gray-700" : "text-gray-400"
              }`}
            >
              {uppercase ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <g fill="none">
                    <path
                      fill="#78eb7b"
                      d="M1.987 13.704a1.084 1.084 0 0 0 0 1.534l5.203 5.204c.424.423 1.11.423 1.534 0l13.289-13.29a1.084 1.084 0 0 0 0-1.533l-2.06-2.06a1.084 1.084 0 0 0-1.533 0L7.957 14.022L5.58 11.644a1.085 1.085 0 0 0-1.534 0z"
                    />
                    <path
                      fill="#c9f7ca"
                      d="M7.957 17.167L20.76 4.365l-.809-.809a1.085 1.085 0 0 0-1.534 0L7.957 14.022L5.58 11.644a1.084 1.084 0 0 0-1.534 0l-.809.809z"
                    />
                    <path
                      stroke="#191919"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M1.987 13.704a1.084 1.084 0 0 0 0 1.534l5.203 5.204c.424.423 1.11.423 1.534 0l13.289-13.29a1.084 1.084 0 0 0 0-1.533l-2.06-2.06a1.084 1.084 0 0 0-1.533 0L7.957 14.022L5.58 11.644a1.085 1.085 0 0 0-1.534 0z"
                      strokeWidth="1"
                    />
                  </g>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              )}
              <span className="text-sm">
                At least one uppercase letter (A–Z)
              </span>
            </div>

            <div
              className={`flex items-center gap-3 ${
                number ? "text-gray-700" : "text-gray-400"
              }`}
            >
              {number ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <g fill="none">
                    <path
                      fill="#78eb7b"
                      d="M1.987 13.704a1.084 1.084 0 0 0 0 1.534l5.203 5.204c.424.423 1.11.423 1.534 0l13.289-13.29a1.084 1.084 0 0 0 0-1.533l-2.06-2.06a1.084 1.084 0 0 0-1.533 0L7.957 14.022L5.58 11.644a1.085 1.085 0 0 0-1.534 0z"
                    />
                    <path
                      fill="#c9f7ca"
                      d="M7.957 17.167L20.76 4.365l-.809-.809a1.085 1.085 0 0 0-1.534 0L7.957 14.022L5.58 11.644a1.084 1.084 0 0 0-1.534 0l-.809.809z"
                    />
                    <path
                      stroke="#191919"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M1.987 13.704a1.084 1.084 0 0 0 0 1.534l5.203 5.204c.424.423 1.11.423 1.534 0l13.289-13.29a1.084 1.084 0 0 0 0-1.533l-2.06-2.06a1.084 1.084 0 0 0-1.533 0L7.957 14.022L5.58 11.644a1.085 1.085 0 0 0-1.534 0z"
                      strokeWidth="1"
                    />
                  </g>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              )}
              <span className="text-sm">At least one number (0–9)</span>
            </div>

            <div
              className={`flex items-center gap-3 ${
                specialCharacter ? "text-gray-700" : "text-gray-400"
              }`}
            >
              {specialCharacter ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <g fill="none">
                    <path
                      fill="#78eb7b"
                      d="M1.987 13.704a1.084 1.084 0 0 0 0 1.534l5.203 5.204c.424.423 1.11.423 1.534 0l13.289-13.29a1.084 1.084 0 0 0 0-1.533l-2.06-2.06a1.084 1.084 0 0 0-1.533 0L7.957 14.022L5.58 11.644a1.085 1.085 0 0 0-1.534 0z"
                    />
                    <path
                      fill="#c9f7ca"
                      d="M7.957 17.167L20.76 4.365l-.809-.809a1.085 1.085 0 0 0-1.534 0L7.957 14.022L5.58 11.644a1.084 1.084 0 0 0-1.534 0l-.809.809z"
                    />
                    <path
                      stroke="#191919"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M1.987 13.704a1.084 1.084 0 0 0 0 1.534l5.203 5.204c.424.423 1.11.423 1.534 0l13.289-13.29a1.084 1.084 0 0 0 0-1.533l-2.06-2.06a1.084 1.084 0 0 0-1.533 0L7.957 14.022L5.58 11.644a1.085 1.085 0 0 0-1.534 0z"
                      strokeWidth="1"
                    />
                  </g>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              )}
              <span className="text-sm">
                At least one special character (e.g. @, #, !, $)
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
                className={`w-full px-4 py-2 border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all pr-10`}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-black text-white px-4 py-2 rounded-full text-sm font-medium border border-gray-200 shadow-sm hover:bg-gray-950 transition-all duration-400 mt-2 cursor-pointer"
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-black hover:underline">
            Log in
          </Link>
        </div>
      </div>
      {/* ==================== SUCCESS DIALOG ==================== */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
            <DialogTitle className="text-2xl text-center">
              Account Created!
            </DialogTitle>
            <DialogDescription className="text-center">
              Your Account has been successfully created <br />
              Please proceed to sign in to have access to your dashboard.
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-center mt-6 w-full">
            <Link to="/login" className="w-full">
              <Button
                onClick={() => setShowSuccessDialog(false)}
                className="w-full py-6"
              >
                Go to sign in
              </Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
      <MutationOverlay isPending={signUpMutation.isPending} message="Creating account..." />
    </div>
  );
}

export default SignUp;
