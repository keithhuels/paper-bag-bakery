import { Card, CardContent } from "@mui/material";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";

export default async function VerifyEmail({ searchParams }: any) {
  let message = "Verifying email...";
  let title = "Verify your email";
  let verified = false;
  const { token, email } = await searchParams;
  const prisma = new PrismaClient();

  if (token) {
    const user = await prisma.users.findFirst({
      where: { token: { equals: token } },
    });

    if (!user?.email) {
      message = "User not found. Check your email for the verification link.";
    } else {
      await prisma.users.update({
        where: { token: token },
        data: {
          verified: true,
          token: null,
        },
      });
    }

    title = "You're all set!";
    message = `Thank you for verifying your email! You can log in with the link below.`;
    verified = true;
  } else {
    message = `We have sent a verification link to ${email}. Please click on the link to complete the verification process.`;
  }

  return (
    <div className="grid place-content-center py-40">
      <Card className="max-w-sm text-center p-8">
        <h1 className="text-3xl text-brand-bread">{title}</h1>
        <CardContent>
          <p
            className="text-lg text-muted-foreground"
            style={{ textWrap: "balance" }}
          >
            {message}
          </p>
        </CardContent>
        {verified && (
          <Link
            href={"/login"}
            className="underline mb-4 bg-primary text-brand-bread text-lg font-medium hover:bg-primary/90 h-10 px-10 py-2 rounded-lg w-full text-center"
          >
            Sign in
          </Link>
        )}
      </Card>
    </div>
  );
}
