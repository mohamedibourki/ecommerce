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
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from 'next/router'

export default function categories() {

    const [name, setName] = useState('')
    const [categories, setCategories] = useState([])
    const [parentCategory, setParentCategory] = useState('')
    const [editedCategory, setEditedCategory] = useState(null)
    const [properties, setProperties] = useState([])
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
        const data = { 
            name, 
            parentCategory, 
            properties: properties.map(p => ({
                name: p.name,
                values: p.values.split(',')
            }))
        }
        if (editedCategory) {
            data._id = editedCategory._id
            await axios.put('/api/categories', data)
            setEditedCategory(null)
        } else {
            await axios.post('/api/categories', data)
        }
        setName('');
        setParentCategory('');
        setProperties([]);
        fetchCategories();
    }

    function editCategory(category) {
        setEditedCategory(category)
        setName(category.name)
        setParentCategory(category.parent?._id)
        setProperties(category.properties.map(p => ({
            name: p.name,
            values: p.values.join(',')
        })))
    }

    function goBack() {
        router.reload()
    }

    function addProperty() {
        setProperties(prev => {
            return [...prev, { name: '', values: '' }]
        })
    }

    function handlePropertyNameChange(index, property, newName) {
        setProperties(prev => {
            const properties = [...prev]
            properties[index].name = newName
            return properties
        })
    }

    function handlePropertyValuesChange(index, property, newValues) {
        setProperties(prev => {
            const properties = [...prev]
            properties[index].values = newValues
            return properties
        })
    }

    function removeProprty(indexToRemove) {
        setProperties(prev => {
            return [...prev].filter((p, pIndex) => {
                return pIndex !== indexToRemove
            })
        })
    }

    return (
        <SideNav>
            <div className='w-screen'>
                <div className="ml-7 mt-7">
                    <Label htmlFor="category-name" className='text-lg'>
                        {editedCategory ? `Edit Category ${editedCategory.name}` : 'Create New Category'}
                    </Label>
                    <form onSubmit={handleSubmit}>
                        <div className='flex'>
                            <Input
                                type="text"
                                id="category-name"
                                placeholder="Category Name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className='text-lg w-1/4 mt-2'
                            />
                            <select
                                className='bg-black ml-3'
                                value={parentCategory}
                                onChange={e => setParentCategory(e.target.value)}
                            >
                                <option value=''>No parent category</option>
                                {categories.map((category) => (
                                    <option value={category._id}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className='block text-lg mt-3'>Properties</label>
                            <Button onClick={addProperty} variant='outline' type='button' className='text-black ml-0 mb-4'>add new property</Button>
                            {properties && properties.map((property, index) => (
                                <div className='flex'>
                                    <Input
                                        type="text"
                                        value={property.name}
                                        onChange={e => handlePropertyNameChange(index, property, e.target.value)}
                                        placeholder="proprty"
                                        className='w-1/4'
                                    />
                                    <Input
                                        type="text"
                                        value={property.values}
                                        onChange={e => handlePropertyValuesChange(index, property, e.target.value)}
                                        placeholder="value"
                                        className='w-1/4'
                                    />
                                    <Button onClick={() => removeProprty(index)} variant='outline' type='button' className='text-black'>Remove</Button>
                                </div>
                            ))}
                        </div>
                        {editedCategory && (
                            <Button
                                onClick={
                                    () => {
                                        setEditedCategory(null)
                                        setName('')
                                        setParentCategory('')
                                        setProperties([])
                                    }
                                }
                                variant='destructive'
                                type='button'
                                className='text-black m-3 ml-0'
                            >
                                Cancel
                            </Button>
                        )}
                        <Button variant='outline' type='submit' className='text-black m-3 ml-0'>Submit</Button>
                    </form>
                    {!editedCategory && (
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
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </div>
        </SideNav >
    )
}