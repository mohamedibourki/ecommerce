import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CFormSelect } from '@coreui/react'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function ProductForm({
    _id,
    title: existingTitle,
    image: existingImage,
    description: existingDescription,
    category: existingCategory,
    color: existingColor,
    size: existingSize,
    stock: existingStock,
    price: existingPrice
}) {
    const [title, setTitle] = useState(existingTitle || '')
    const [image, setImage] = useState(existingImage || '')
    const [description, setDescription] = useState(existingDescription || '')
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState(existingCategory || '')
    const [color, setColor] = useState(existingColor || '')
    const [size, setSize] = useState(existingSize || '')
    const [stock, setStock] = useState(existingStock || '')
    const [price, setPrice] = useState(existingPrice || '')
    const [goToProducts, setGoToProducts] = useState(false)

    useEffect(() => {
        axios.get('/api/categories').then(
            (res) => {
                setCategories(res.data)
                console.log(res.data);
            }
        )
    }, [])

    const router = useRouter()

    async function saveProduct(ev) {
        ev.preventDefault();
        const data = { title, image, description, category, color, size, price, stock };
        if (_id) {
            await axios.put('/api/products', { ...data, _id })
        } else {
            await axios.post('/api/products', data);
        }
        setGoToProducts(true);
    }

    if (goToProducts) {
        router.push('/products')
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='w-screen ml-10 mt-10'>
            <div className="grid w-full max-w-sm items-center gap-1.5 text-black">
                <form onSubmit={saveProduct}>
                    <Label htmlFor="product-name" className={"text-white"}>
                        Product Name
                    </Label>
                    <Input
                        type="product-name"
                        id="product-name"
                        placeholder="Product Name"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className='bg-transparent text-white'
                    />
                    <label for="picture" className='text-white'>The Image:</label>
                    <input
                        type="file"
                        id="picture"
                        name="picture"
                        className='text-white'
                        onChange={handleImageChange}
                    />
                    {image && <img src={image} alt='' className='w-4/6' />}
                    <Label htmlFor="description" className={"text-white"}>
                        Description
                    </Label>
                    <Textarea
                        placeholder="Type your description here."
                        id="description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className='bg-transparent text-white'
                    />
                    <Label htmlFor="category" className={"text-white text-base"}>
                        Category
                    </Label>
                    <br />
                    <select
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        className='text-xl'
                    >
                        <option>unCategorized</option>
                        {categories && categories.map(c => (
                            <option key={c._id} value={c._id}>{c.name}</option>
                        ))}
                    </select>
                    <br />
                    <Label htmlFor="color" className={"text-white"}>
                        Color
                    </Label>
                    <br />
                    <CFormSelect
                        aria-label="Default select example"
                        className='mb-1 rounded p-1'
                        options={[
                            'Color',
                            { label: 'White', value: 'White' },
                            { label: 'Black', value: 'Black' },
                            { label: 'Red', value: 'Red' },
                            { label: 'Green', value: 'Green' },
                            { label: 'Blue', value: 'Blue' },
                        ]}
                        value={color}
                        onChange={e => setColor(e.target.value)}
                    />
                    <br />
                    <Label htmlFor="size" className={"text-white"}>
                        Size
                    </Label>
                    <Input
                        type="size" id="size"
                        placeholder="Size"
                        value={size}
                        onChange={e => setSize(e.target.value)}
                        className='bg-transparent text-white'
                    />
                    <Label htmlFor="size" className={"text-white"}>
                        Stock
                    </Label>
                    <Input
                        type="size" id="size"
                        placeholder="Size"
                        value={stock}
                        onChange={e => setStock(e.target.value)}
                        className='bg-transparent text-white'
                    />
                    <Label htmlFor="price" className={"text-white"}>
                        Price in $
                    </Label>
                    <Input
                        type="price"
                        id="price"
                        placeholder="Price"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        className='bg-transparent text-white'
                    />
                    <Button type='submit' variant='outline' className='text-black w-fit mt-2'>
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    )
}
