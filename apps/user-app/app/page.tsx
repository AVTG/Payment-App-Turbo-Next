import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import { redirect } from "next/navigation";

// app/page.tsx
export default async function HomePage() {
  const session = await getServerSession(authOptions) ;
  if(!session?.user){
    redirect("api/auth/signin") ;
  }
  else{
    redirect("/dashboard") ;

  }
}
