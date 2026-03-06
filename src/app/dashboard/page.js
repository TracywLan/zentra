import { auth } from "@/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongo";
import Project from "@/models/Project";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  await dbConnect();

  const rawProjects = await Project.find({ userId: session.user.id }).lean();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-4">Welcome back, {session.user.name}</p>
      <p className="text-sm text-gray-500">Role: {session.user.role}</p>
    </div>
  );
}