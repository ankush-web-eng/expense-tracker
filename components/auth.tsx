
import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";

function AuthButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <Button
        onClick={() => signOut()}
      >
        Sign Out
      </Button>
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
