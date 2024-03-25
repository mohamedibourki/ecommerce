import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/product"

export default async function handle(req, res) {
    const { method } = req
    await mongooseConnect()

    if (method === "GET") {
        if (req.query?.id) {
            res.json(await Product.findOne({ _id: req.query.id }))
        } else {
            res.json(await Product.find())
        }
    }

    if (method === "POST") {
        const { title, image, description, category, color, size, price } = req.body
        const productDoc = await Product.create({ title, image, description, category, color, size, price })
        res.json(productDoc)
    }

    if (method === "PUT") {
        const { _id, ...updateData } = req.body;
        const updatedProduct = await Product.findOneAndUpdate({ _id }, updateData, { new: true });
        res.json(updatedProduct);
    }
}