import { SignInResponse } from "next-auth/react";
import { ZodError } from "zod";

export interface AuthInputs {
  email: string;
  password: string;
  confirmPassword?: string;
}

export type CredentialsError = SignInResponse | Response | ZodError<AuthInputs>;
