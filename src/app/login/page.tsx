"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";
import Form from "./form";

export default function LoginPage() {
  const router = useRouter();
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      router.push("/profile");
    } else {
      // Handle errors
    }
  }
  return <Form />;
}
