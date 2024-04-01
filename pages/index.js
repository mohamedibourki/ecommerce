import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import SideNav from "@/components/nav/SideNav";

export default function Home() {
  const { data: session } = useSession()
  if (session) {
    return <SideNav>
      <div>
        Hello {session?.user.name || "User"} ! <br />
      </div>
    </SideNav>
  }
  return <main className={` flex flex-col items-center justify-center h-screen`}>
    Not signed in
    <Button  onClick={() => signIn('google')}>Sign in</Button>
  </main>
}