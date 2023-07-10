import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authoption";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions)
  if (session){
    redirect("/teacher/dashboard2")
  }
  return (
    
    <main className="w-full bg-no-repeat px-5 py-5 bg-cover bg-[url('/home.jpg')]	">

      <div className="flex justify-center items-center h-screen text-3xl text-white">
        <i>
          “Innovation is the key to the future,<br></br> but basic research is
          the key to future innovation.”
        </i>
        <br></br>
        <br></br>
        <br></br>– Jerome Isaac Friedman
      </div>
      {/* <Link href={"/something"}>Go to Something</Link> */}
    </main>
  );
}
