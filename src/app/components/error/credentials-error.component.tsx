import { CredentialsProps } from "./error";

const CredentialsError = ({
  inputError,
  signInError,
  registrationError,
}: {
  inputError?: CredentialsProps["inputError"];
  signInError?: CredentialsProps["signInError"];
  registrationError?: CredentialsProps["registrationError"];
}) => {
  const error = inputError || signInError || registrationError;
  const createErrorMessage = (
    error:
      | CredentialsProps["inputError"]
      | CredentialsProps["signInError"]
      | CredentialsProps["registrationError"],
  ) => {
    switch (error) {
      case inputError:
        return (
          inputError?.email?._errors[0] ||
          inputError?.password?._errors[0] ||
          inputError?.confirmPassword?._errors[0]
        );
      case signInError:
        const signInErrorType = "CredentialsSignin";
        return signInErrorType
          ? "Invalid email or password"
          : "An error occured and we were not able to sign you in.";
      case registrationError:
        const errorStatus = registrationError?.status;
        return errorStatus === 400
          ? "There is already an account associated with this email."
          : "An error occured and we were not able to register an account.";
      default:
        return "An unknown error occured.";
    }
  };

  const errorMessage: string | undefined = createErrorMessage(error);
  return <p className="text-rose-500">{errorMessage}</p>;
};

export default CredentialsError;
