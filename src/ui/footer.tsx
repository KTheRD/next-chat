"use client";

import { signOut } from "@/auth";
import { useSession } from "next-auth/react";
import SignOutButton from "./signOutButton";

export default function Footer() {
  const { data, status } = useSession();

  return (
    <footer>
      {status === "authenticated" && (
        <>
          <p>Logged in as {data.user?.name}</p>
          <SignOutButton />
        </>
      )}
    </footer>
  );
}
