import { signOut } from "@/auth";
import { signOutSafe } from "@/lib/actions";

export default function SignOutButton() {
  return (
    <form
      action={(e) => {
        signOutSafe();
      }}
    >
      <button>Sign Out</button>
    </form>
  );
}
