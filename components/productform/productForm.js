import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useRouter } from 'next/router'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';

export default function ProductForm({
    _id,
    title: existingTitle,
    image: existingImage,
    description: existingDescription,
    category: existingCategory,
    stock: existingStock,
    price: existingPrice,
    properties: existingProperties,
    status: existingStatus,
}) {
    const [title, setTitle] = useState(existingTitle || '')
    const [image, setImage] = useState(existingImage || '')
    const [description, setDescription] = useState(existingDescription || '')
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState(existingCategory || '')
    const [stock, setStock] = useState(existingStock || '')
    const [price, setPrice] = useState(existingPrice || '')
    const [status, setStatus] = useState(existingStatus || '')
    const [productProperties, setProductProperties] = useState(existingProperties || {})
    const [goToProducts, setGoToProducts] = useState(false)

    useEffect(() => {
        axios.get('/api/categories').then(
            (res) => {
                setCategories(res.data)
            }
        )
    }, [])

    const router = useRouter()

    async function saveProduct(ev) {
        ev.preventDefault();
        const data = { title, image, description, category, stock, status, price, properties: productProperties };
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

    // const propertiesToFill = [];
    // if (categories.length > 0 && category) {
    //     let catInfo = categories.find(({ _id }) => _id === category);
    //     if (catInfo) {
    //         propertiesToFill.push(...catInfo.properties);
    //         while (catInfo?.parent?._id) {
    //             const parentCat = categories.find(({ _id }) => _id === catInfo?.parent?._id);
    //             if (parentCat) {
    //                 propertiesToFill.push(...parentCat.properties);
    //                 catInfo = parentCat;
    //             } else {
    //                 break;
    //             }
    //         }
    //     }
    // }

    const propertiesToFill = [];
    if (categories.length > 0 && category) {
        let catInfo = categories.find(({ _id }) => _id === category);
        propertiesToFill.push(...catInfo.properties);
        while (catInfo?.parent?._id) {
            const parentCat = categories.find(({ _id }) => _id === catInfo?.parent?._id);
            propertiesToFill.push(...parentCat.properties);
            catInfo = parentCat;
        }
    }

    function setProductProp(propName, value) {
        setProductProperties(prev => {
            const newProductProps = { ...prev };
            newProductProps[propName] = value;
            return newProductProps;
        });
    }

    return (
        <div>
            <div>
                <form onSubmit={saveProduct}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Add Product</CardTitle>
                            <CardDescription>Add your product here so easily.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form>
                                <div>
                                    <Label htmlFor="product-name">
                                        Product Name
                                    </Label>
                                    <Input
                                        type="product-name"
                                        id="product-name"
                                        placeholder="Product Name"
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="picture">Picture</Label>
                                    <Input onChange={handleImageChange} id="picture" type="file" />
                                    {image && <img src={image} alt='' />}
                                </div>
                                <div>
                                    <Label htmlFor="description">
                                        Description
                                    </Label>
                                    <Textarea
                                        placeholder="Type your description here."
                                        id="description"
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="category" className={"text-base"}>
                                        Category
                                    </label>
                                    <br />
                                    <select
                                        value={category}
                                        onChange={
                                            ev => setCategory(ev.target.value)
                                        }
                                        className='text-xl'
                                    >
                                        <option>unCategorized</option>
                                        {categories && categories.map(c => (
                                            <option
                                                key={c._id}
                                                value={c._id}
                                            >
                                                {c.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    {propertiesToFill && propertiesToFill.map(p => (
                                        <div className='flex'>
                                            <div>{p.name}</div>
                                            <select value={productProperties[p.name]} onChange={e => setProductProp(p.name, e.target.value)}>
                                                {p.values.map(v => (
                                                    <option
                                                        key={v}
                                                        value={v}
                                                    >
                                                        {v}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    ))}
                                </div>
                                <div className='my-3'>
                                    <label for="Status" className='block'>Status</label>
                                    <select value={status} onChange={e => setStatus(e.target.value)} name="Status" id="Status">
                                    <option value="NoN">NoN</option>
                                        <option value="Published">Published</option>
                                        <option value="Draft">Draft</option>
                                        <option value="Scheduled">Scheduled</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                                <div>
                                    <Label htmlFor="stock" >
                                        Stock
                                    </Label>
                                    <Input
                                        type="stock"
                                        id="stock"
                                        placeholder="Stock"
                                        value={stock}
                                        onChange={e => setStock(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="price" >
                                        Price in $
                                    </Label>
                                    <Input
                                        type="price"
                                        id="price"
                                        placeholder="Price"
                                        value={price}
                                        onChange={e => setPrice(e.target.value)}
                                    />
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter>
                            <Button type='submit'>Submit</Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </div >
    )
}
