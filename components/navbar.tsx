import { getSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
export default async function NavBar() {
  const session = await getSession();
  return (
    <div>
      {session ? (
        <Link href="/">Log out</Link>
      ) : (
        <Link href="/login">log in</Link>
      )}
    </div>
  );
}
