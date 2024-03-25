import SideNav from '@/components/nav/SideNav'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function DeleteProduct() {
    const [productInfo, setProductInfo] = useState()
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/api/products?id=' + id).then(
            res => {
                setProductInfo(res.data)
            }
        )
    }, [id])

    function goBack() {
        router.push('/products')
    }

    async function deleteProduct() {
        await axios.delete('/api/products?id=' + id)
        goBack()
    }
    return <main className='text-white'>
        <SideNav>
            Do You really want to delete product {productInfo?.title} ?
            <Button variant='destructive' className='text-black' onClick={deleteProduct}>Yes</Button>
            <Button variant='outline' className='text-black' onClick={goBack}>No</Button>
        </SideNav>
    </main>
}
