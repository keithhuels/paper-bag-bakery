import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";
import Error from "next/error";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    // validate email and password. Zod?

    const hashedPassword = await hash(password, 10);

    await sql`
    INSERT INTO users(email, password)
    VALUES (${email.toLowerCase()}, ${hashedPassword})
    `;
  } catch (e: any) {
    return new NextResponse(e.message, { status: 400 });
  }
  return NextResponse.json({ message: "Success" });
}
