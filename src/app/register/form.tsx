"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { z, ZodError, ZodFormattedError } from "zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Font } from "@react-email/components";
import { CredentialsProps } from "../components/error/error";
import CredentialsError from "../components/error/credentials-error.component";

export default function Form() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordInputValue, setPasswordInputValue] = useState("");
  const [confirmPasswordInputValue, setConfirmPasswordInputValue] =
    useState("");
  const [displayErrorMessage, setDisplayErrorMessage] =
    useState<CredentialsProps>({ shouldDisplay: false });

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
      if (response.ok && response.status === 200) {
        router.push("/login");
        router.refresh();
        //send confirm email and route to login?
      }
      if (!response.ok) {
        setDisplayErrorMessage({
          shouldDisplay: true,
          registrationError: response,
        });
      }
    } else {
      const error = validateInputResult.error.format();
      setDisplayErrorMessage({ shouldDisplay: true, inputError: error });
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <label className="flex justify-center text-3xl font-medium text-gray-900 m-8">
        Create Account
      </label>
      <div className="flex justify-center mt-4">
        <div className="w-80 border-2 rounded-md">
          <input
            type="text"
            name="email"
            id="email"
            className="py-1.5 pl-7 pr-32 text-gray-900 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm/6"
            placeholder="Email"
            required
          ></input>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <div className="w-80 border-2 rounded-md">
          <input
            style={{ border: "none", borderColor: "transparent" }}
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            value={passwordInputValue}
            onChange={(e) => setPasswordInputValue(e.target.value)}
            className="py-1.5 pl-7 pr-20 text-gray-900 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm/6"
            placeholder="Password"
            required
          ></input>
          <button
            id="toggleShowPassword"
            className={
              !passwordInputValue.length
                ? "text-xs ml-2 text-zinc-200"
                : "text-xs ml-2"
            }
            disabled={!passwordInputValue.length}
            type="button"
            onMouseDown={() => setShowPassword(!showPassword)}
            onMouseUp={() => setShowPassword(!showPassword)}
          >
            <FontAwesomeIcon className="ml-2" icon={faEye}></FontAwesomeIcon>
          </button>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <div className="w-80 border-2 rounded-md">
          <input
            id="confirmPassword"
            name="confirmPassword"
            style={{ border: "none", borderColor: "transparent" }}
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPasswordInputValue}
            onChange={(e) => setConfirmPasswordInputValue(e.target.value)}
            className="rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm/6"
            placeholder="Confirm Password"
            required
          ></input>
          <button
            id="toggleShowConfirmPassword"
            className={
              !confirmPasswordInputValue.length
                ? "text-xs ml-2 text-zinc-200"
                : showConfirmPassword
                  ? "text-xs ml-2 focus:bg-blue-100"
                  : "text-xs ml-2"
            }
            disabled={!confirmPasswordInputValue.length}
            type="button"
            onMouseDown={() => setShowConfirmPassword(!showConfirmPassword)}
            onMouseUp={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <FontAwesomeIcon className="ml-2 " icon={faEye}></FontAwesomeIcon>
          </button>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        {displayErrorMessage.shouldDisplay && (
          <CredentialsError
            inputError={displayErrorMessage.inputError}
            signInError={displayErrorMessage.signInError}
            registrationError={displayErrorMessage.registrationError}
          />
        )}
      </div>
      <div className="flex justify-center mt-4">
        <button
          type="submit"
          className="h-10 rounded-lg border-2 font-bold bg-blue-400 hover:bg-blue-200 px-5 focus:bg-blue-300"
        >
          Register
        </button>
      </div>
    </form>
  );
}
