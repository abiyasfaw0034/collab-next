"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function Form() {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    // console.log({ response });
    if (!response?.error) {
      router.push("/");
      router.refresh();
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-600">Email</label>
        <input
          type="email"
          name="email"
          className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-indigo-200"
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label className="block text-gray-600">Password</label>
        <input
          name="password"
          type="password"
          className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-indigo-200"
          placeholder="Enter your password"
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
      >
        Login
      </button>
    </form>
  );
}
