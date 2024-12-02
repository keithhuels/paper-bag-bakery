"use client";
import { useState } from "react";
import Navbar from "./navbar/navbar.component";
import Sidebar from "./sidebar/sidebar.component";
import { Session } from "next-auth";

const Navigation = ({ session }: { session: Session | null }): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} session={session} />
    </>
  );
};

export default Navigation;
