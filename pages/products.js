import SideNav from '@/components/nav/SideNav'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from 'next/router'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export default function products() {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const router = useRouter()

    useEffect(() => {
        axios.get('/api/products').then(
            (res) => {
                setProducts(res.data)
            }
        )
        axios.get('/api/categories').then(
            (res) => {
                setCategories(res.data)
            }
        )
    }, [])

    function goBack() {
        router.reload()
    }

    return (
        <SideNav>
            <div>
                <div className='w-full'>
                    <Button className='float-end' asChild>
                        <Link href={'/products/add-product'}>Add Product</Link>
                    </Button>
                </div>
                <Table className="my-10">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Stock</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product._id}>
                                <TableCell>
                                    {product.title}
                                </TableCell>
                                <TableCell>
                                    {categories.find(cat => cat._id === product.category)?.name || 'Unknown'}
                                </TableCell>
                                <TableCell>
                                    {product.price}$
                                </TableCell>
                                <TableCell>
                                    {product.status}
                                </TableCell>
                                <TableCell>
                                    {product.stock}
                                </TableCell>
                                <TableCell>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button>Actions</Button>
                                        </PopoverTrigger>
                                        <PopoverContent className='flex justify-center gap-2 flex-col w-32'>
                                            <Button asChild>
                                                <Link href={`/products/edit/${product._id}`}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-0 pl-0 mr-2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                    </svg>
                                                    Edit
                                                </Link>
                                            </Button>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant='destructive'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                        </svg>
                                                        Delete
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Delete Product</DialogTitle>
                                                        <DialogDescription>
                                                            Do you really want to delete this product {product.title}.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <Button variant='destructive' onClick={
                                                        async () => {
                                                            await axios.delete('/api/products?id=' + product._id)
                                                            goBack()
                                                        }
                                                    }>
                                                        Yes
                                                    </Button>
                                                </DialogContent>
                                            </Dialog>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </SideNav>
    )
}