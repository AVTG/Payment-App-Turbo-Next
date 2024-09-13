import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./lib/auth";
import { Suspense } from "react";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session?.user?.id) {
    redirect("/dashboard"); // Redirects the user
  } else {
    redirect("/api/auth/signin"); // Redirects the user to sign-in
  }

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div>Redirecting...</div>
    </Suspense>
  );}