import { model, models, Schema } from "mongoose"

const ProductSchema = new Schema({
    title: { type: String },
    image: { type: String },
    description: { type: String },
    category: { type: String },
    properties: { type: Object },
    price: { type: Number }
})

export const Product = models.Product || model('Product', ProductSchema)