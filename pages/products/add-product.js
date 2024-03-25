import SideNav from '@/components/nav/SideNav'
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CFormSelect } from '@coreui/react'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function addProduct() {

    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [color, setColor] = useState('')
    const [size, setSize] = useState('')
    const [price, setPrice] = useState('')
    const [goToProducts, setGoToProducts] = useState(false)

    const router = useRouter()

    async function handleSubmit(ev) {
        ev.preventDefault();
        const data = { title, image, description, category, color, size, price };
        await axios.post('/api/products', data);
        setGoToProducts(true);
    }

    if (goToProducts) {
        router.push('/products')
    }

    return (
        <SideNav>
            <div className='w-screen ml-10 mt-10'>
                <div className="grid w-full max-w-sm items-center gap-1.5 text-black">
                    <form onSubmit={handleSubmit}>
                        <Label htmlFor="product-name" className={"text-white"}>
                            Product Name
                        </Label>
                        <Input
                            type="product-name"
                            id="product-name"
                            placeholder="Product Name"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <Label htmlFor="picture" className={"text-white"}>
                            Photos
                        </Label>
                        <Input
                            id="picture"
                            type="file"
                            className={"text-white"}
                            value={image}
                            onChange={e => setImage(e.target.value)}
                        />
                        <Label htmlFor="description" className={"text-white"}>
                            Description
                        </Label>
                        <Textarea
                            placeholder="Type your description here."
                            id="description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                        <Label htmlFor="category" className={"text-white"}>
                            Category
                        </Label>
                        <br />
                        <CFormSelect
                            aria-label="Default select example"
                            className='mb-1 rounded p-1'
                            options={[
                                'Category',
                                { label: 'Phone', value: '1' },
                                { label: 'Tv', value: '2' },
                                { label: 'Pc', value: '3' }
                            ]}
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                        />
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
                                { label: 'White', value: '1' },
                                { label: 'Black', value: '2' },
                                { label: 'Red', value: '3' }
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
                        />
                        <Button type='submit' variant='outline' className='text-black w-fit mt-2'>
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
        </SideNav>
    )
}
