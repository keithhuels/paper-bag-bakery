"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { z } from "zod";
import { CredentialsError as CredentialsErrorType } from "../components/error/error";
import CredentialsError from "../components/error/credentials-error.component";

export default function Form() {
  const router = useRouter();
  const [error, setError] = useState<CredentialsErrorType>();

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
        router.push("/");
        router.refresh();
      } else {
        setError(signInResponse);
      }
    }

    if (inputValidation.error) {
      setError(inputValidation.error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label className="flex justify-center text-3xl font-medium text-gray-900 m-8">
        Log In
      </label>
      <div className="flex justify-center mt-2 rounded-md">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 sm:text-sm"></span>
        </div>
        <input
          type="text"
          name="email"
          id="email"
          className="flex justify-center rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm/6"
          placeholder="Email"
          required
        ></input>
      </div>
      <div className="flex justify-center mt-4">
        <input
          type="password"
          name="password"
          id="password"
          className="rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm/6"
          placeholder="Password"
          required
        ></input>
      </div>
      <div className="flex justify-center mt-4">
        {error && <CredentialsError error={error} />}
      </div>
      <div className="flex justify-center mt-4">
        <button
          type="submit"
          className="h-10 rounded-lg border-2 font-bold bg-blue-400 hover:bg-blue-200 px-5 focus:bg-blue-300"
        >
          Login
        </button>
      </div>
      <div className="flex justify-center mt-4">
        <p className="text-sm">
          Don't have an account?{" "}
          <Link href="/register">
            <button className="text-blue-500 hover:text-blue-300 focus:text-blue-200">
              Create one!
            </button>
          </Link>
        </p>
      </div>
    </form>
  );
}
