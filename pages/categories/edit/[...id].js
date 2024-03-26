import SideNav from '@/components/nav/SideNav'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'

export default function EditCategory() {

    const [category, setCategory] = useState()
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/api/categories?id=' + id).then(
            (res) => {
                setCategory(res.data)
            })
    }, [id])

    return <main className='text-white'>
        <SideNav>
            <div className='w-screen'>
                {/* {category && (
                    <ProductForm {...category} />
                )} */}
            </div>
        </SideNav>
    </main>
}
