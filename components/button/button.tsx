"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { signIn, useSession, signOut } from "next-auth/react"

export function AuthButton() {
  const { data: session } = useSession()
  if(session) {
    return <>
      Signed in as {session?.user?.name} <br/>
      <Button variant={"outline"} onClick={() => signOut()}>Sign out</Button>
    </>
  }
  return <>
    Not signed in <br/>
    <Button variant={"outline"} onClick={() => signIn()}>Sign in</Button>
  </>
}