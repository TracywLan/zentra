'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session && status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Sprint Manager</h1>
        <p className="text-gray-600 mb-8">
          Manage your projects and sprints efficiently. Get started by signing in or creating an account.
        </p>
        
        <div className="space-y-4">
          <Link
            href="/login"
            className="w-full inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 py-3 px-4 text-sm font-medium text-white hover:bg-blue-700"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="w-full inline-flex items-center justify-center rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}

