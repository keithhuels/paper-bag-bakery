import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { generateSecureToken } from "../../../../utils/generate-token";
import EmailVerificationTemplate from "@/emails/email-verification-template";
import React from "react";
import { Resend } from "resend";
import { PrismaClient } from "@prisma/client";

const resend = new Resend(process.env.RESEND_API_KEY);
const prisma = new PrismaClient();

interface Email {
  to: string[];
  subject: string;
  react: React.ReactElement;
}

async function sendEmail(payload: Email) {
  const { error } = await resend.emails.send({
    from: "The The Paper Bag Bakery Team <onboarding@consciouscog.dev>",
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

    await prisma.users.create({
      data: {
        email: formattedEmail,
        password: hashedPassword,
        token: emailVerificationToken,
      },
    });

    await sendEmail({
      to: [formattedEmail],
      subject: "Verify your email address",
      react: React.createElement(EmailVerificationTemplate, {
        email: email,
        emailVerificationToken: emailVerificationToken,
      }),
    });
  } catch (e: any) {
    await prisma.$disconnect();
    return new NextResponse(e.message, { status: 400 });
  }
  await prisma.$disconnect();
  return NextResponse.json({ message: "Success" });
}
