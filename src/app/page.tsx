import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href="/login">SignIn</Link>
      <Link href="/register">SignUp</Link>
    </>
  );
}
