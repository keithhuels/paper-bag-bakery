import { Card, CardHeader, CardContent } from "@mui/material";
import { sql } from "@vercel/postgres";
import Link from "next/link";

export default async function VerifyEmail({ searchParams }: any) {
  let message = "Verifying email...";
  let title = "Verify your email";
  let verified = false;
  console.log(searchParams);

  if (searchParams.token) {
    const user = await sql`
    SELECT email FROM users
    WHERE token = ${searchParams.token}`;

    if (!user) {
      message = "User not found. Check your email for the verification link.";
    } else {
      await sql`
        UPDATE users
        SET verified = true, token = NULL
        where token = ${searchParams.token}`;

      title = "You're all set!";
      message = `Thank you for verifying your email! You can log in with the link below.`;
      verified = true;
    }
  } else {
    message = `We have sent a verification link to ${searchParams.email}. Please click on the link to complete the verification process.`;
  }

  return (
    <div className="grid place-content-center py-40">
      <Card className="max-w-sm text-center p-8">
        <h1 className="text-3xl text-blue-600">{title}</h1>
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
            className="underline mb-4 bg-primary text-blue-600 text-lg font-medium hover:bg-primary/90 h-10 px-10 py-2 rounded-lg w-full text-center"
          >
            Sign in
          </Link>
        )}
      </Card>
    </div>
  );
}
