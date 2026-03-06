import { signOut } from "@/auth";

export default function SignOut() {
    return <form
        action={async () => {
            "use server";
            await signOut();
        }}
    >
        <button 
            type="submit"
            className="bg-black text-white px-4 py-2 rounded shadow-sm hover:bg-gray-500 font-medium transition-colors"
        >
            Sign Out
        </button>
    </form>;
}