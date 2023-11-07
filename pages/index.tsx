
import { Inter } from 'next/font/google'
import { ShopLayout } from '@/components/layouts'
import {  Typography } from '@mui/material'
import { ProductList } from '@/components/products'
import useSWR from 'swr'
import { NextPage } from 'next'
import { useProducts } from '@/hooks'
import { FullScreenLoading } from '@/components/ui'

const inter = Inter({ subsets: ['latin'] })


const HomePage: NextPage = () => {

  const {products, isLoading} = useProducts('/products')

  return (
    <ShopLayout title={'TesloShop - Home'} pageDescription={'Encuentran los mejores productos de Teslo'} imageFullUrl={''}>
        <Typography variant={'h1'} component='h1'>Tienda</Typography>  
        <Typography variant={'h2'} sx={{ mb: 1 }}>Tienda</Typography>  

        {
          isLoading 
          ? <FullScreenLoading/>
          : <ProductList products={products}/>
        }


    </ShopLayout>
  )
}

export default HomePage