import Link from "next/link";
import { auth } from "@/auth";
import SignIn from "./auth/SignIn";
import SignOut from "./auth/SignOut";
import { useSession } from "next-auth/react";



export default async function Navbar() {
    const session = await auth();

    return (
        <nav className="relative bg-gray-800 text-white flex h-16 items-center justify-between mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <Link href="/" className="text-xl font-bold">
                Zentra
            </Link>

            <div className="flex items-center gap-4 ">
                {session ? (
                    <>
                        <span>
                            {session.user.name}
                        </span>
                        <Link href="/dashboard">
                            Dashboard
                        </Link>
                        <SignOut />
                    </>
                ) : (
                    <SignIn />
                )}
            </div>
        </nav>
    )
}