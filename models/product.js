import mongoose, { model, models, Schema } from "mongoose"

const ProductSchema = new Schema({
    title: { type: String },
    image: { type: String },
    description: { type: String },
    status: { type: String },
    category: { type: mongoose.Types.ObjectId, ref: 'Category' },
    stock: { type: Number },
    properties: { type: Object },
    price: { type: Number }
})

export const Product = models.Product || model('Product', ProductSchema)