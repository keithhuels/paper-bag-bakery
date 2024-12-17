import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AuthForm from "../components/auth/auth-form.component";

export default async function RegisterPage() {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }
  return <AuthForm authFlow={"Create Account"} />;
}
