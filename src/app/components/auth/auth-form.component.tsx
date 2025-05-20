"use client";
import { signIn, SignInResponse } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { z, ZodError } from "zod";
import { CredentialsError } from "../types/error";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const AuthForm = ({ authFlow }: { authFlow: string }) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordInputValue, setPasswordInputValue] = useState("");
  const [confirmPasswordInputValue, setConfirmPasswordInputValue] =
    useState("");
  const [error, setError] = useState<CredentialsError>();

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    const userSchema = z
      .object({
        email: z.string().email(),
        password: z
          .string()
          .trim()
          .min(8, "Password must be at least 8 characters")
          .trim(),
        confirmPassword: z.string().trim(),
      })
      .refine((formData) => formData.password === formData.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });

    const validateInputResult = userSchema.safeParse({
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    });

    if (validateInputResult.success) {
      const response = await fetch("api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });

      if (response.ok) {
        if (response.status === 200) {
          router.push(`/verify-email?email=${email}`);
          router.refresh();
        }
      } else {
        setError(response);
      }
    } else {
      setError(validateInputResult.error);
    }
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const userSchema = z.object({
      email: z.string().email(),
      password: z.string(),
    });
    const inputValidation = userSchema.safeParse({
      email: email,
      password: password,
    });
    if (inputValidation.success) {
      const signInResponse = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });
      if (!signInResponse?.error) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setError(signInResponse);
      }
    }
    if (inputValidation.error) {
      setError(inputValidation.error);
    }
  };

  const createErrorMessage = (error: CredentialsError): string => {
    const isInputError = error instanceof ZodError;
    const isRegistrationError = error instanceof Response;
    const isSigninError =
      (error as SignInResponse) &&
      (error as SignInResponse).hasOwnProperty("error") &&
      typeof (error as SignInResponse).error === "string";

    if (isInputError) {
      const formattedError = error.format();
      return (
        formattedError.email?._errors[0] ||
        formattedError.password?._errors[0] ||
        formattedError.confirmPassword?._errors[0] ||
        "An unknown input error occurred."
      );
    } else if (isRegistrationError) {
      return error.status === 400
        ? "An account already exists with this email."
        : "An error occured and we were not able to register your account.";
    } else if (isSigninError) {
      return error.status === 401
        ? "Invalid email or password."
        : "An error occured and we were not able to log you in.";
    } else {
      return "An unknown error occured.";
    }
  };

  return (
    <form onSubmit={authFlow === "Login" ? handleLogin : handleRegister}>
      <label className="flex justify-center text-brand-dark text-3xl font-medium m-8">
        {authFlow}
      </label>

      <div className="flex justify-center mt-4">
        <div className="rounded-md pl-4 ring-1 ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brown-600 bg-white">
          <input
            type="text"
            name="email"
            id="email"
            autoComplete="on"
            className="mr-12 py-1.5 pr-10 text-gray-900 placeholder:text-gray-400 sm:text-sm/6"
            style={{ outline: "none" }}
            placeholder="Email"
            required
          ></input>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <div className="rounded-md pl-4 ring-1 ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brown-600 bg-white">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            autoComplete="off"
            value={passwordInputValue}
            onChange={(e) => setPasswordInputValue(e.target.value)}
            className="mr-4 py-1.5 pr-10 text-gray-900 placeholder:text-gray-400 sm:text-sm/6"
            style={{ outline: "none" }}
            placeholder="Password"
            required
          ></input>
          <button
            id="toggleShowPassword"
            className={
              !passwordInputValue.length
                ? "text-xs mr-4 text-zinc-200"
                : "text-xs mr-4"
            }
            disabled={!passwordInputValue.length}
            type="button"
            onMouseDown={() => setShowPassword(!showPassword)}
            onMouseUp={() => setShowPassword(!showPassword)}
            onTouchStart={() => setShowPassword(!showPassword)}
            onTouchEnd={() => setShowPassword(!showPassword)}
          >
            <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
          </button>
        </div>
      </div>

      {authFlow === "Create Account" && (
        <div className="flex justify-center mt-4">
          <div className="rounded-md pl-4 ring-1 ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brown-600 bg-white">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPasswordInputValue}
              autoComplete="off"
              onChange={(e) => setConfirmPasswordInputValue(e.target.value)}
              className="mr-4 py-1.5 pr-10 text-gray-900 placeholder:text-gray-400 sm:text-sm/6"
              style={{ outline: "none" }}
              placeholder="Confirm Password"
              required
            ></input>

            <button
              id="toggleShowConfirmPassword"
              className={
                !confirmPasswordInputValue.length
                  ? "text-xs mr-4 text-zinc-200"
                  : "text-xs mr-4"
              }
              disabled={!passwordInputValue.length}
              type="button"
              onMouseDown={() => setShowConfirmPassword(!showConfirmPassword)}
              onMouseUp={() => setShowConfirmPassword(!showConfirmPassword)}
              onTouchStart={() => setShowConfirmPassword(!showConfirmPassword)}
              onTouchEnd={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-center mt-4">
        {error && <p className="text-rose-500">{createErrorMessage(error)}</p>}
      </div>

      <div className="flex justify-center mt-4">
        <button
          type="submit"
          className="h-10 rounded-lg text-brand-dark border-2 font-bold bg-brand-bread hover:bg-brand-bag px-5 focus:bg-brand-bread"
        >
          {authFlow}
        </button>
      </div>

      {authFlow === "Login" && (
        <div className="flex justify-center mt-4">
          <p className="text-sm text-brand-dark">
            Don't have an account?{" "}
            <Link href="/register">
              <button className="text-brand-bread hover:text-brand-bread focus:text-brand-dark">
                Create one!
              </button>
            </Link>
          </p>
        </div>
      )}
    </form>
  );
};

export default AuthForm;
