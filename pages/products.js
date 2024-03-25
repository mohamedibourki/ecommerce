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

export default function products() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get('/api/products').then(
            (res) => {
                setProducts(res.data)
            })
    }, [])

    return <main className='text-white'>
        <SideNav>
            <div className='w-screen'>
                <Button variant='outline' className='text-black' asChild>
                    <Link href={'/products/add-product'}>Add Product</Link>
                </Button>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='text-lg'>Product Name</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow>
                                <TableCell className='pl-10 text-lg'>
                                    {product.title}
                                </TableCell>
                                <TableCell>
                                    <Button variant='outline' className='text-black' asChild>
                                        <Link href={`/products/edit/${product._id}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-0 pl-0 mr-2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>
                                            Edit
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </SideNav>
    </main>
}