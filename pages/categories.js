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

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

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
            <div>
                <div>
                    <Label htmlFor="category-name" >
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
                            />
                            <Select>
                                <SelectTrigger
                                    value={parentCategory}
                                    onChange={e => setParentCategory(e.target.value)}
                                >
                                    <SelectValue placeholder="No parent category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {categories.map((category) => (
                                            <SelectItem value={category._id}>{category.name}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className='block'>Properties</label>
                            <Button onClick={addProperty} type='button' >add new property</Button>
                            {properties && properties.map((property, index) => (
                                <div className='flex'>
                                    <Input
                                        type="text"
                                        value={property.name}
                                        onChange={e => handlePropertyNameChange(index, property, e.target.value)}
                                        placeholder="proprty"
                                    />
                                    <Input
                                        type="text"
                                        value={property.values}
                                        onChange={e => handlePropertyValuesChange(index, property, e.target.value)}
                                        placeholder="value"
                                    />
                                    <Button onClick={() => removeProprty(index)} type='button' >Remove</Button>
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
                            >
                                Cancel
                            </Button>
                        )}
                        <Button type='submit' >Submit</Button>
                    </form>
                    {!editedCategory && (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead >Category Name</TableHead>
                                    <TableHead >Parent Category</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categories.map((category) => (
                                    <TableRow>
                                        <TableCell >{category.name}</TableCell>
                                        <TableCell >{category?.parent?.name}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => editCategory(category)} asChild>
                                                <Link href={''}>Edit</Link>
                                            </Button>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button  >
                                                        Delete
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent >
                                                    <DialogHeader>
                                                        <DialogTitle>Delete Product</DialogTitle>
                                                        <DialogDescription>
                                                            Do you really want to delete this category {category.name}.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <Button variant='destructive' onClick={
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