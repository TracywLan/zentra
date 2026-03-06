import Link from "next/link";
import { auth } from "@/auth";
import SignIn from "./auth/LoginButton";
import SignOut from "./auth/SignOut";




export default async function Navbar() {
    const session = await auth();

    return (
        <nav className="relative bg-white-800 text-black-600 flex h-16 items-center justify-between mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <Link href="/" className="text-xl font-bold">
                Zentra
            </Link>
            <div className="flex items-center gap-4 text-med font-medium" >
                {session ? (
                    <>
                        {/* <span>
                            {session.user.name}
                        </span> */}
                        <Link href="/dashboard" className="px-4 py-2 rounded hover:bg-gray-300 transition-colors">
                            Dashboard
                        </Link>
                        <Link href='/projects' className="px-4 py-2 rounded hover:bg-gray-300 transition-colors">
                            Projects
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
