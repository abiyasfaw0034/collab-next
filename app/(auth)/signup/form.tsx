"use client";

import { useRouter } from "next/navigation";

export function Form() {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Registration failed");
    }

    // Redirect on successful registration
    router.push("/"); // Using Next.js router
    // Alternatively: window.location.href = "/";
    // console.log({ response });
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-600">Full Name</label>
        <input
          type="text"
          name="name"
          className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-indigo-200"
          placeholder="Enter your FullName"
        />
      </div>
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
        Register
      </button>
    </form>
  );
}
