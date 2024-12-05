import { Resend } from "resend";
import Welcome from "@/emails/Welcome";

const resend = new Resend("re_123456789");

export async function POST() {
  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["delivered@resend.dev"],
    subject: "Hello World",
    react: Welcome(),
  });
}
