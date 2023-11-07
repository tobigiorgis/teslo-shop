import { ShopLayout } from '@/components/layouts'
import { SizeSelector } from '@/components/products'
import { ProductSlideshow } from '@/components/products'
import { ItemCounter } from '@/components/ui'
import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { dbProducts } from '@/database'
import { ICartProduct, IProduct, ISize } from '@/interfaces'
import { Box, Button, Chip, Grid, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { log } from 'console'
import { useRouter } from 'next/router'
import { CartContext } from '@/context'


interface Props {
  product: IProduct;
}

const ProductPage:NextPage<Props> = ({product}) => {

  const router = useRouter()
  const {addProductToCart} = useContext(CartContext)

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1
  })

  const selectedSize = (size: ISize) => {
    setTempCartProduct(currentProduct => ({
      ...currentProduct,
      size
    }));
  }

  const updateQuantity = (quantity: number) => {
    setTempCartProduct(currentProduct => ({
      ...currentProduct,
      quantity
    }));
  }

  const onAddProduct = () => {

    if (!tempCartProduct.size) return

    // llamar la accion del context para agregar al carrito
    addProductToCart(tempCartProduct)
    router.push('/cart')
    

  }

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>

      <Grid container spacing={3}>

        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={product.images} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>
            {/* Titulos */}
            <Typography variant='h1' component='h1'>{product.title}</Typography>
            <Typography variant='subtitle1' component='h2'>{`$${product.price}`}</Typography>

            {/* Cantidad */}
            <Box sx={{my: 2}}>
              <Typography variant='subtitle2'>Cantidad</Typography>
              <ItemCounter
                currentValue= {tempCartProduct.quantity}
                updateQuantity= {updateQuantity}
                maxValue= {product.inStock > 10 ? 10 : product.inStock}
              />
              <SizeSelector
                sizes={product.sizes}
                selectedSize={tempCartProduct.size}
                onSelectedSize={selectedSize}
              />
            </Box>

            {/* Agregar al carrito */}
            {
              (product.inStock > 0)
              ? (
                <Button color='secondary' className='circular-btn' onClick={onAddProduct}>
                  {
                    tempCartProduct.size
                    ? 'Agregar al carrito'
                    : 'Selecciona una talla'
                  }
                </Button>
              )
              : (
                <Chip label='No hay disponibles' color='error' variant='outlined'/>
              )
            }

            {/* <Chip label='No hay disponibles' color='error' variant='outlined'/> */}

            {/* Descripcion  */}
            <Box sx={{mt: 3}}>
            <Typography variant='subtitle2'>Descripcion</Typography>
            <Typography variant='body2'>{product.description}</Typography>
            </Box>

          </Box>

        </Grid>

      </Grid>

    </ShopLayout>
  )
}

// export const getServerSideProps: GetServerSideProps = async ({params}) => {

//   const {slug = ''} = params as {slug: string}
//   const product = await dbProducts.getProductBySlug(slug)

//   if (!product) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false
//       }
//     }
//   }

//   return {
//     props:{
//       product
//     }
//   }
// }

// getStaticPaths

export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const productsSlugs = await dbProducts.getAllProductsSlugs();

  return {
    paths: productsSlugs.map( ({slug}) => ({
      params: {
        slug
      }
    })),
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {

  const {slug = ''} = params as {slug: string}
  const product = await dbProducts.getProductBySlug(slug)

    if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }


  return {
    props:{
      product
    },
    revalidate: 60 * 60 * 24 // 24 horas
  }
}

export default ProductPage