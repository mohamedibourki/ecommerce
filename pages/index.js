import SideNav from "@/components/nav/SideNav";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return <SideNav>
    <div>
      <UserButton />
    </div>
  </SideNav>
}