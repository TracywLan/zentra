import { auth } from "@/auth";

export default async function AdminPanel() {
    const session = await auth();

    return (
        <div className="p-8">
        <h1 className="text-3xl font-bold text-red-600">Admin Control Panel</h1>
        <p className="mt-4">
            Access Granted: <strong>{session.user.email}</strong>
        </p>
        
        <section className="mt-8 p-6 bg-white border border-red-200 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">Sensitive System Data</h2>
            <p className="text-gray-600">Only users with the "admin" role can see this section.</p>
        </section>
        </div>
    );
}