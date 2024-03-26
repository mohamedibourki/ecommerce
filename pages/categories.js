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

export default function categories() {

    const [name, setName] = useState('')
    const [categories, setCategories] = useState([])
    const [parentCategory, setParentCategory] = useState('')
    const [edditedCategory, setEditedCategory] = useState(null)

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
                                        <Button variant='outline' className='text-black' asChild>
                                            <Link href={`/categories/delete/${category._id}`}>Delete</Link>
                                        </Button>
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