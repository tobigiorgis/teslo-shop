
import { Inter } from 'next/font/google'
import { ShopLayout } from '@/components/layouts'
import {  Box, Typography } from '@mui/material'
import { ProductList } from '@/components/products'
import { GetServerSideProps, NextPage } from 'next'
import { dbProducts } from '@/database'
import { IProduct } from '@/interfaces'

const inter = Inter({ subsets: ['latin'] })

interface Props {
    products: IProduct[];
    foundProducts: boolean;
    query: string;
}


const SearchPage: NextPage<Props> = ({products, foundProducts, query}) => {


  return (
    <ShopLayout title={'TesloShop - Search'} pageDescription={'Encuentran los mejores productos de Teslo'} imageFullUrl={''}>
        <Typography variant={'h1'} component='h1'>Buscar Producto</Typography>  

        {
            foundProducts 
                ? <Typography variant={'h2'} sx={{ mb: 1 }} textTransform='capitalize'>{query}</Typography>  
                : (
                    <Box>
                        <Typography variant={'h2'} sx={{ mb: 1 }} color='secondary'>No se encontraron resultados para: {query}</Typography>
                    </Box>
                )
        }


        <ProductList products={products}/>


    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {

    const {query = ''} = params as {query: string};

    if (query.length === 0) {
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }

    let products = await dbProducts.getProductsByTerm(query)
    const foundProducts = products.length > 0;

    // TODO: retornar otros productos
    if (!foundProducts) {
        products = await dbProducts.getAllProducts()
    }

    return {
        props:{
            products,
            foundProducts,
            query
        }
    }
}

export default SearchPage