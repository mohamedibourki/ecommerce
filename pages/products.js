import SideNav from '@/components/nav/SideNav'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function products() {
    return <main className='text-white'>
        <SideNav>
            <div className='w-screen'>
                <Button variant='outline' className='text-black' asChild>
                    <Link href={'/products/add-product'}>Add Product</Link>
                </Button>
            </div>
        </SideNav>
    </main>
}