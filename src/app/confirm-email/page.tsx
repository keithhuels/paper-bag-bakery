import { getServerSession } from "next-auth";
import Form from "./form";
import { redirect } from "next/navigation";

export default async function ConfirmEmailPage() {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }
  return <h1>HI</h1>;
}
