
import { useSession, signOut } from "next-auth/react";

function AuthButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <button
        onClick={() => signOut()}
        className="hover:bg-blue-500 hover:text-white font-serif pr-2 bg-white dark:bg-black rounded-xl px-2 py-1 space-x-2 p-1 flex items-center border-2 border-gray-300 dark:border-gray-800"
      >
        <span className="font-semibold">Sign Out</span>
      </button>
    );
  } 
}

export const Auth = () => {
  return (
    <div>
      <AuthButton />
    </div>
  );
};
