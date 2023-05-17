// not capatilized because multiple components are exported.

// advantages: can export multiple components from a single line AND you can also add the 'use client' directive once and ahve it apply to all the components in the file

"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export function SignInButton() {
  const { data: session, status } = useSession();
  console.log({ session, status });
  if (status === "loading") {
    return <p>...</p>;
  }
  if (status === "authenticated") {
    return (
      <Link href={`/dashboard`}>
        <Image
          src={session.user?.image ?? "/mememan.webp"}
          width={32}
          height={32}
          alt='Your Name'
        />
      </Link>
    );
  }
  return <button onClick={() => signIn()}>SignIn</button>;
}
export function SignOutButton() {
  return <button onClick={() => signOut()}>SignOut</button>;
}
