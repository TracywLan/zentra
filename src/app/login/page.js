import { redirect } from "next/navigation";
import { auth } from "@/auth";
import LoginButton from "@/components/auth/LoginButton";

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-md text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">Zentra</h2>
        <p className="text-gray-500 mt-2">Sign in to manage your sprints</p>
        <div className="mt-8">
          <LoginButton />
        </div>
      </div>
    </div>
  );
}