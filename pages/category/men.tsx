
import { Inter } from 'next/font/google'
import { ShopLayout } from '@/components/layouts'
import {  Typography } from '@mui/material'
import { ProductList } from '@/components/products'
import useSWR from 'swr'
import { NextPage } from 'next'
import { useProducts } from '@/hooks'
import { FullScreenLoading } from '@/components/ui'

const inter = Inter({ subsets: ['latin'] })


const MenPage: NextPage = () => {

  const {products, isLoading} = useProducts('/products?gender=men')

  return (
    <ShopLayout title={'TesloShop - Kids'} pageDescription={'Encuentran los mejores productos de Teslo para men'} imageFullUrl={''}>
        <Typography variant={'h1'} component='h1'>Men</Typography>  
        <Typography variant={'h2'} sx={{ mb: 1 }}>Productos para hombres</Typography>  

        {
          isLoading 
          ? <FullScreenLoading/>
          : <ProductList products={products}/>
        }


    </ShopLayout>
  )
}

export default MenPage