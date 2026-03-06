import { signIn } from "@/auth";

export default function LoginButton() {
    return <form
        action={async () => {
            "use server";
            await signIn("github"); 
        }}
    >
        <button 
            type="submit"
            className="bg-gray-900 text-white px-6 py-2 rounded shadow-sm hover:bg-gray-800 font-medium transition-colors w-full"
        >
            Sign In with GitHub
        </button>
    </form>;
}