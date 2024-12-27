import { Card, CardHeader, CardContent } from "@mui/material";
import { sql } from "@vercel/postgres";
import Link from "next/link";
interface VerifyEmailPageProps {
  searchParams: { [key: string]: string | undefined };
}

export default async function VerifyEmail({
  searchParams,
}: VerifyEmailPageProps) {
  let message = "Verifying email...";
  let verified = false;

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

      message = `Email verified!`;
      verified = true;
    }
  } else {
    message =
      "We have sent a verification link to your email. Please click on the link to complete the verification process.";
  }

  return (
    <div className="grid place-content-center py-40">
      <Card className="max-w-sm text-center">
        <CardHeader>
          <h1>Verify your email</h1>
        </CardHeader>
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
