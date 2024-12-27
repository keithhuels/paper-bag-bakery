import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";
import { generateSecureToken } from "../../../../utils/generate-token";
import { sendEmail } from "../emails/route";
import EmailVerificationTemplate from "@/emails/email-verification-template";
import React from "react";

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
        username: email,
        emailVerificationToken: emailVerificationToken,
      }),
    });
  } catch (e: any) {
    return new NextResponse(e.message, { status: 400 });
  }
  return NextResponse.json({ message: "Success" });
}
