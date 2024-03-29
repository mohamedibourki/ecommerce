import mongoose, { model, models, Schema } from "mongoose"

const ProductSchema = new Schema({
    title: { type: String },
    image: { type: String },
    description: { type: String },
    category: { type: mongoose.Types.ObjectId, ref: 'Category' },
    properties: { type: Object },
    tags: { type: String },
    status: { type: String },
    stock: { type: Number },
    price: { type: Number }
})

export const Product = models.Product || model('Product', ProductSchema)