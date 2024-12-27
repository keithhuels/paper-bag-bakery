"use client";
import React, { createContext, useState } from "react";

const AuthContext = createContext({});

const [isVerified, setIsVerified] = useState(false);

export default function AuthProvider({ children }: any) {
  return (
    <AuthContext.Provider value={{ setIsVerified }}>
      {children}
    </AuthContext.Provider>
  );
}
