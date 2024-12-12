import { ZodError } from "zod";
import { SignInResponse } from "next-auth/react";
import { CredentialsError as CredentialsErrorType } from "./error";

const CredentialsError = ({ error }: { error: CredentialsErrorType }) => {
  const createErrorMessage = (error: CredentialsErrorType) => {
    const isInputError = error instanceof ZodError;
    const isRegistrationError = error instanceof Response;
    const isSigninError =
      (error as SignInResponse) &&
      (error as SignInResponse).hasOwnProperty("error") &&
      typeof (error as SignInResponse).error === "string";

    if (isInputError) {
      const formattedError = error.format();
      return (
        formattedError.email?._errors[0] ||
        formattedError.password?._errors[0] ||
        formattedError.confirmPassword?._errors[0]
      );
    } else if (isRegistrationError) {
      return error.status === 400
        ? "There is already an account associated with this email."
        : "An error occured and we were not able to register an account.";
    } else if (isSigninError) {
      return error.status === 401
        ? "Invalid email or password."
        : "An error occured and we were not able to log you in.";
    } else {
      return "An unknown error occured.";
    }
  };
  return <p className="text-rose-500">{createErrorMessage(error)}</p>;
};

export default CredentialsError;
