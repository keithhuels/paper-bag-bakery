import { redirect } from "next/navigation";
import React, { FormEvent } from "react";
import Form from "./form";
import { getServerSession } from "next-auth";

export default async function LoginPage() {
  const session = await getServerSession();

  if (session) {
    //redirect to dashboard?
    redirect("/");
  }
  return <Form />;
}
