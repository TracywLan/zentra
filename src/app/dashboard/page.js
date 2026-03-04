'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Sprint Manager</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex flex-col items-end">
                <p className="text-sm font-medium text-gray-900">{session.user.name}</p>
                <p className="text-xs text-gray-500">{session.user.email}</p>
              </div>
              <button
                onClick={() => signOut({ redirect: true, callbackUrl: '/login' })}
                className="inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="rounded-lg border-4 border-dashed border-gray-200 px-4 py-6 sm:px-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Welcome, {session.user.name}!</h2>
            
            <div className="space-y-4">
              <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
                <h3 className="text-md font-medium text-gray-900 mb-2">Account Information</h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Name:</span> {session.user.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Email:</span> {session.user.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Role:</span> {session.user.role}
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-blue-50 p-6 border border-blue-200">
                <h3 className="text-md font-medium text-blue-900 mb-2">Getting Started</h3>
                <p className="text-sm text-blue-800">
                  This is your dashboard. You can manage your sprints and tasks from here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
