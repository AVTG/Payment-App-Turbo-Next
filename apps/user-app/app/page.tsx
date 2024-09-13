import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import { redirect } from "next/navigation";

// app/page.tsx
export default function HomePage() {
  const session = getServerSession(authOptions) ;
  if(!session?.user){
    redirect(process.env.NEXTAUTH_URL+ "/api/auth/signin") ;
  }
  else{
    redirect(process.env.NEXTAUTH_URL+ "/dashboard") ;

  }
}
