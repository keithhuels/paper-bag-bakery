import { ZodFormattedError } from "zod";

export interface CredentialsProps {
  shouldDisplay: boolean;
  inputError?: ZodFormattedError<
    {
      email: string;
      password: string;
      confirmPassword?: string;
    },
    string
  >;
  signInError?: string;
  registrationError?: Response;
}
