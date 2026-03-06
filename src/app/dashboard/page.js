import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function Dashboard() {
    const session = await auth();

    if (!session) {
        redirect("/api/auth/signin");
    }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Logged in as {session.user.name}</span>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              {session.user.role}
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium text-gray-900">Active Projects</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">0</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium text-gray-900">Pending Tasks</h3>
            <p className="text-3xl font-bold text-yellow-600 mt-2">0</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium text-gray-900">Completed</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">0</p>
          </div>
        </div>
      </div>
    </div>
  );
}