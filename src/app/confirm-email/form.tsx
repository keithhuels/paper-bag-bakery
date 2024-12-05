import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Form(formData: FormData) {
  const router = useRouter();
  const [displayRegistrationError, setDisplayRegistrationError] =
    useState(false);

  const handleRegister = async () => {
    const response = await fetch("api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    if (response.ok && response.status === 200) {
      router.push("/login");
      router.refresh();
      //send confirm email and route to login?
    }
    if (!response.ok && response.status === 400) {
      setDisplayRegistrationError(true);
    }
  };
  return (
    <div className="mt-8 flex justify-center">
      <button>Confirm Email</button>
    </div>
  );
}
