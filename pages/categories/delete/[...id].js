import SideNav from '@/components/nav/SideNav'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function DeleteCategorie() {

    const [category, setCategory] = useState({})
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/api/categories?id=' + id).then(
            res => {
                setCategory(res.data)
            }
        )
    }, [id])

    function goBack() {
        router.push('/categories')
    }

    async function deleteCategory() {
        await axios.delete('/api/categories?id=' + id)
        goBack()
    }

    return <main className='text-white'>
        <SideNav>
            <h1 className='text-xl'>Do You really want to delete category {category?.name} ?</h1>
            <Button variant='destructive' className='text-black text-xl' onClick={deleteCategory}>Yes</Button>
            <Button variant='outline' className='text-black text-xl' onClick={goBack}>No</Button>
        </SideNav>
    </main>
}