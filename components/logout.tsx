"use client";
import { signOut } from "next-auth/react";
import React from "react";
export default function LogOut() {
  return (
    <div
      onClick={() => {
        signOut();
      }}
    >
      log out
    </div>
  );
}
