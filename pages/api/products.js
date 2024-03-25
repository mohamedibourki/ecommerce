import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/product"

export default async function handle(req, res) {
    const { method } = req
    await mongooseConnect()
    if (method === "POST") {
        const { title, image, description, category, color, size, price } = req.body
        const productDoc = await Product.create({
            title, image, description, category, color, size, price
        })
        res.json(productDoc)
    }
}