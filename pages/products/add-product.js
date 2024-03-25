import SideNav from '@/components/nav/SideNav'
import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CFormSelect } from '@coreui/react'

export default function addProduct() {
    const color = 'text-white'
    return (
        <SideNav>
            <div className='w-screen ml-10 mt-10'>
                <div className="grid w-full max-w-sm items-center gap-1.5 text-black">
                    <Label htmlFor="product-name" className={color}>
                        Product Name
                    </Label>
                    <Input type="product-name" id="product-name" placeholder="Product Name" />
                    <Label htmlFor="picture" className={color}>
                        Photos
                    </Label>
                    <Input id="picture" type="file" className={color} />
                    <Label htmlFor="description" className={color}>
                        Description
                    </Label>
                    <Textarea placeholder="Type your description here." id="description" />
                    <Label htmlFor="category" className={color}>
                        Category
                    </Label>
                    <CFormSelect
                        aria-label="Default select example"
                        className='mb-1 rounded p-1'
                        options={[
                            'Category',
                            { label: 'Phone', value: '1' },
                            { label: 'Tv', value: '2' },
                            { label: 'Pc', value: '3' }
                        ]}
                    />
                    <Label htmlFor="color" className={color}>
                        Color
                    </Label>
                    <CFormSelect
                        aria-label="Default select example"
                        className='mb-1 rounded p-1'
                        options={[
                            'Color',
                            { label: 'White', value: '1' },
                            { label: 'Black', value: '2' },
                            { label: 'Red', value: '3' }
                        ]}
                    />
                    <Label htmlFor="size" className={color}>
                        Size
                    </Label>
                    <Input type="size" id="size" placeholder="Size" />
                    <Label htmlFor="price" className={color}>
                        Price in $
                    </Label>
                    <Input type="price" id="price" placeholder="Price" />
                </div>
            </div>
        </SideNav>
    )
}
