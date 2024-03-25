import { model, models, Schema } from "mongoose"

const ProductSchema = new Schema({
    title: { type: String },
    image: { type: String },
    description: { type: String },
    category: { type: String },
    color: { type: String },
    size: { type: String },
    price: { type: String }
})

export const Product = models.Product || model('Product', ProductSchema)