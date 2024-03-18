import Link from "next/link"
 
import { Button } from "@/components/ui/button"
 
export function ButtonAsChild() {
  return (
    <Button asChild variant={"outline"}>
      <Link href="/login">Login</Link>
    </Button>
  )
}