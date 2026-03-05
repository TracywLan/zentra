"use client"; 
import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">Welcome Back</h1>
      <button 
        onClick={() => signIn("github", { callbackUrl: "/" })}
        className="px-6 py-3 text-white bg-gray-900 rounded-md hover:bg-gray-800"
      >
        Sign in with GitHub
      </button>
    </div>
  );
}

