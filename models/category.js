import mongoose, { model, models, Schema } from "mongoose"

const CategorySchema = new Schema({
    name: { type: String },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    properties: [{ type: Object }]
})

export const Category = models?.Category || model('Category', CategorySchema)