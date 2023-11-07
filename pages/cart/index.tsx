import { CartList, OrderSummary } from '@/components/cart'
import { ShopLayout } from '@/components/layouts'
import { CartContext } from '@/context'
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'

export const CartPage = () => {

    const {isLoaded, cart} = useContext(CartContext)
    const router = useRouter()

    useEffect(() => {
      if (isLoaded && cart.length === 0) {
        router.replace('/cart/empty')
      }
      // Dependencias
    }, [isLoaded, cart, router])

    if (!isLoaded || cart.length === 0) {
        return (<></>)
    }
    

  return (
    <ShopLayout title='Carrito' pageDescription='Carrito de compras'>
        <Typography variant='h1' component='h1'>Carrito</Typography>

        <Grid>
            <Grid item xs={12} sm={7}>
                <CartList editable/>
            </Grid>


            <Grid item xs={12} sm={5}>
                <Card className='summary-card'>
                    <CardContent>

                        <Typography variant='h2' component='h2'>Resumen</Typography>
                        <Divider sx={{my: 1}}/>

                        <OrderSummary/>

                        <Box display='flex' justifyContent='space-between'>
                            <Button 
                                color='secondary' 
                                className='circular-btn' 
                                href='/checkout/address'
                                fullWidth>
                                Checkout
                            </Button>
                        </Box>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}
