import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AuthForm from "../components/auth/auth-form.component";

export default async function RegisterPage() {
  return <AuthForm authFlow={"Create Account"} />;
}
