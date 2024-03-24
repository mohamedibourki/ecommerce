import { Inter } from "next/font/google";
import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import SideNav from "@/components/nav/SideNav";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession()
  if (!session) {
    return <main className={`text-white`}>
      <SideNav>
        <div className="w-screen">
          Hello {session?.user.name || "Mohamed Ibourki" } ! <br />
          <Button variant="outline" className='text-black' onClick={() => signOut()}>Sign out</Button>
        </div>
      </SideNav>
    </main>
  }
  return <main className={`text-white flex flex-col items-center justify-center h-screen`}>
    Not signed in
    <Button variant="outline" className='text-black' onClick={() => signIn('google')}>Sign in</Button>
  </main>
}
