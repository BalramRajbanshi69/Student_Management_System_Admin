import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { loginUser } from "../../store/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Input from "../form/input/InputField";

// Define a specific interface for your form data
interface LoginFormInputs {
  email: string;
  password: string;
}

export default function SignInForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
   const { token } = useAppSelector((state) => state.auth);
  // Provide the LoginFormInputs type to useForm
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

    // Use useEffect to check for an existing token on component mount
  useEffect(() => {
    if (token) {
      // If a token exists in the Redux store, navigate to the dashboard
      navigate("/");
    }
  }, [token, navigate]);

  const handleLoginIn = async (data: LoginFormInputs) => {
    try {
      // Dispatch the thunk and unwrap the result to handle success or failure
      const resultAction = await dispatch(loginUser(data));
      const { token } = (resultAction);
      
      // If unwrapResult succeeds, we have the token
      localStorage.setItem("token", token);
      toast.success("Admin logged in successfully");
      navigate("/");
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to log in. Please try again!");
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="w-full max-w-md pt-10 mx-auto">
        {/* <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Back to dashboard
        </Link> */}
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div>
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>
          <div>
            {/* ... (social login buttons commented out) */}
            <div className="relative py-3 sm:py-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="p-2 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2">
                  Or
                </span>
              </div>
            </div>
            <form onSubmit={handleSubmit(handleLoginIn)}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Email <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input 
                    type="text" 
                    placeholder="info@gmail.com" 
                    error={errors.email}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                        message: "Enter a valid email address"
                      }
                    })}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>
                  )}
                </div>
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input 
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      error={errors.password}
                      {...register("password", {
                        required: "Password is required"
                      })}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                    {errors.password && (
                      <span className="text-red-500 text-xs mt-1">{errors.password.message}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Keep me logged in
                    </span>
                  </div>
                  {/* ... (forgot password link commented out) */}
                </div>
                <div>
                  <Button className="w-full" size="sm">
                    Sign in
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Don&apos;t have an account? {""}
                <Link
                  to="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
