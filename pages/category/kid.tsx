
import { Inter } from 'next/font/google'
import { ShopLayout } from '@/components/layouts'
import {  Typography } from '@mui/material'
import { ProductList } from '@/components/products'
import useSWR from 'swr'
import { NextPage } from 'next'
import { useProducts } from '@/hooks'
import { FullScreenLoading } from '@/components/ui'

const inter = Inter({ subsets: ['latin'] })


const KidPage: NextPage = () => {

  const {products, isLoading} = useProducts('/products?gender=kid')

  return (
    <ShopLayout title={'TesloShop - Kids'} pageDescription={'Encuentran los mejores productos de Teslo para kids'} imageFullUrl={''}>
        <Typography variant={'h1'} component='h1'>Niños</Typography>  
        <Typography variant={'h2'} sx={{ mb: 1 }}>Productos para niños</Typography>  

        {
          isLoading 
          ? <FullScreenLoading/>
          : <ProductList products={products}/>
        }


    </ShopLayout>
  )
}

export default KidPage