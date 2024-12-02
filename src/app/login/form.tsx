"use client";
import { signIn, SignInResponse } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Form() {
  const router = useRouter();
  const [response, setResponse] = useState<SignInResponse | undefined>(
    undefined,
  );
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    setResponse(response);

    if (!response?.error) {
      router.push("/");
      router.refresh();
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
        {" "}
        {response?.error === "CredentialsSignin" ? (
          <p className="text-rose-500">
            You have entered an invalid email or password.
          </p>
        ) : null}
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
          No account?{" "}
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
