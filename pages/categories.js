import SideNav from '@/components/nav/SideNav'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from 'next/link'

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from 'next/router'

export default function categories() {

    const [name, setName] = useState('')
    const [categories, setCategories] = useState([])
    const [parentCategory, setParentCategory] = useState('')
    const [edditedCategory, setEditedCategory] = useState(null)
    const router = useRouter()

    useEffect(() => {
        fetchCategories()
    }, [])

    function fetchCategories() {
        axios.get('/api/categories').then(
            (res) => {
                setCategories(res.data)
            }
        )
    }

    async function handleSubmit() {
        const data = { name, parentCategory }
        if (edditedCategory) {
            data._id = edditedCategory._id
            await axios.put('/api/categories', data)
            setEditedCategory(null)
        } else {
            await axios.post('/api/categories', data)
        }
        setName('')
        fetchCategories()
    }

    function editCategory(category) {
        setEditedCategory(category)
        setName(category.name)
        setParentCategory(category.parent?._id)
    }

    function goBack() {
        router.reload()
    }

    return (
        <SideNav>
            <div className='w-screen'>
                <div className="ml-7 mt-7">
                    <Label htmlFor="category-name" className='text-lg'>
                        {edditedCategory ? `Edit Category ${edditedCategory.name}` : 'Create New Category'}
                    </Label>
                    <form onSubmit={handleSubmit} className='flex'>
                        <Input
                            type="text"
                            id="category-name"
                            placeholder="Category Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className='text-lg'
                        />
                        <select
                            className='bg-black'
                            value={parentCategory}
                            onChange={e => setParentCategory(e.target.value)}
                        >
                            <option value=''>No parent category</option>
                            {categories.map((category) => (
                                <option value={category._id}>{category.name}</option>
                            ))}
                        </select>
                        <Button variant='outline' type='submit' className='text-black'>Submit</Button>
                    </form>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='text-xl'>Category Name</TableHead>
                                <TableHead className='text-xl'>Parent Category</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.map((category) => (
                                <TableRow>
                                    <TableCell className='text-xl'>{category.name}</TableCell>
                                    <TableCell className='text-xl'>{category?.parent?.name}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => editCategory(category)} variant='outline' className='text-black' asChild>
                                            <Link href={''}>Edit</Link>
                                        </Button>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" className='text-black'>
                                                    Delete
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-md">
                                                <DialogHeader>
                                                    <DialogTitle>Delete Product</DialogTitle>
                                                    <DialogDescription>
                                                        Do you really want to delete this category {category.name}.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <Button variant='destructive' className='text-black' onClick={
                                                    async () => {
                                                        await axios.delete('/api/categories?id=' + category._id)
                                                        goBack()
                                                    }
                                                }>
                                                    Yes
                                                </Button>
                                                <DialogFooter className="sm:justify-start">
                                                    <DialogClose asChild>
                                                        <Button type="button" variant="secondary">
                                                            Close
                                                        </Button>
                                                    </DialogClose>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </SideNav>
    )
}