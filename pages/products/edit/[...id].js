import SideNav from '@/components/nav/SideNav'
import ProductForm from '@/components/productform/productForm'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function EditProduct() {
    const [productInfo, setProductInfo] = useState(null)
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/api/products?id=' + id).then(
            (res) => {
                setProductInfo(res.data)
            })
    }, [id])

    return <main >
        <SideNav>
            <div >
                {productInfo && (
                    <ProductForm {...productInfo} />
                )}
            </div>
        </SideNav>
    </main>
}