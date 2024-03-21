import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Products() {
    return <>
        <Button variant="link" style={{ color: "white", fontSize: "25px", fontWeight: "bolder" }}>
            <Link href={"/new-products"}>Add New Products</Link>
        </Button>
    </>
}