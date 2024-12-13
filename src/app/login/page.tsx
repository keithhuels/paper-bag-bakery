import { redirect } from "next/navigation";
import React from "react";
import AuthForm from "../components/auth/auth-form.component";
import { getServerSession } from "next-auth";

export default async function LoginPage() {
  const session = await getServerSession();

  if (session) {
    //redirect to dashboard?
    redirect("/");
  }
  return <AuthForm authFlow={"Login"} />;
}
