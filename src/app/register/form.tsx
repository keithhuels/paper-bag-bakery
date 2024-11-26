"use client";
import { FormEvent } from "react";

export default function Form() {
  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch("api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    console.log({ response });
  };
  return (
    <form onSubmit={handleRegister}>
      <label className="flex justify-center text-3xl font-medium text-gray-900 m-8">
        Create Account
      </label>
      <div className="flex justify-center mt-2 rounded-md">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 sm:text-sm"></span>
        </div>
        <input
          type="text"
          name="email"
          id="email"
          className="flex justify-center rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm/6"
          placeholder="Email"
          required
        ></input>
      </div>
      <div className="flex justify-center mt-4">
        <input
          type="password"
          name="password"
          id="password"
          className="rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
          placeholder="Password"
          required
        ></input>
      </div>
      <div className="flex justify-center mt-4">
        <button
          type="submit"
          className="h-10 rounded-lg border-2 font-bold bg-indigo-400 hover:bg-indigo-200 px-5 focus:bg-indigo-300"
        >
          Register
        </button>
      </div>
    </form>
  );
}
