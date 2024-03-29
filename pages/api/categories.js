import { mongooseConnect } from "@/lib/mongoose"
import { Category } from "@/models/category"
import { getServerSession } from "next-auth"
import { auth0, isAdminRequest } from "./auth/[...nextauth]"

export default async function categories(req, res) {

    const { method } = req
    await mongooseConnect()
    await isAdminRequest(req, res)

    if (method === 'POST') {
        const { name, parentCategory, properties } = req.body
        await Category.create({
            name,
            parent: parentCategory || undefined,
            properties
        })
    }

    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await Category.findOne({ _id: req.query.id }))
        } else {
            res.json(await Category.find().populate('parent'))
        }
    }

    if (method === 'PUT') {
        const { name, parentCategory, properties, _id } = req.body
        await Category.updateOne({ _id }, {
            name,
            parent: parentCategory || undefined,
            properties
        })
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await Category.deleteOne({ _id: req.query?.id })
            res.json(true)
        }
    }

}