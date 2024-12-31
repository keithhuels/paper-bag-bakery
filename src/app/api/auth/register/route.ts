import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";
import { generateSecureToken } from "../../../../utils/generate-token";
import EmailVerificationTemplate from "@/emails/email-verification-template";
import React from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface Email {
  to: string[];
  subject: string;
  react: React.ReactElement;
}

async function sendEmail(payload: Email) {
  const { error } = await resend.emails.send({
    from: "The Conscious Cog Team <onboarding@resend.dev>",
    ...payload,
  });

  if (error) {
    console.error("Error sending email", error);
    return null;
  }

  console.log("Email sent successfully");
  return true;
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const formattedEmail = email.toLowerCase();
    const hashedPassword = await hash(password, 10);
    const emailVerificationToken = generateSecureToken();

    await sql`
    INSERT INTO users(email, password, token)
    VALUES (${formattedEmail}, ${hashedPassword}, ${emailVerificationToken})
    `;

    await sendEmail({
      to: [formattedEmail],
      subject: "Verify your email address",
      react: React.createElement(EmailVerificationTemplate, {
        email: email,
        emailVerificationToken: emailVerificationToken,
      }),
    });
  } catch (e: any) {
    return new NextResponse(e.message, { status: 400 });
  }
  return NextResponse.json({ message: "Success" });
}
