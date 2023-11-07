import { CartList, OrderSummary } from '@/components/cart'
import { ShopLayout } from '@/components/layouts'
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material'
import { Box, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material'
import NextLink from 'next/link'

const OrderPage = () => {
  return (
    <ShopLayout title='Carrito' pageDescription={'Resumen de la orden'}>
        <Typography variant='h1' component='h1'>Orden</Typography>

        {/* <Chip label='Pendiente de pago' variant='outlined' color='error' sx={{my: 2}} icon={<CreditCardOffOutlined/>}/> */}
        <Chip label='Pagar' variant='outlined' color='error' sx={{my: 2}} icon={<CreditScoreOutlined/>}/>

        <Grid>
            <Grid item xs={12} sm={7}>
                <CartList/>
            </Grid>


            <Grid item xs={12} sm={5}>
                <Card className='summary-card'>
                    <CardContent>

                        <Typography variant='h2' component='h2'>Resumen</Typography>
                        <Divider sx={{my: 1}}/>

                        <Box display={'flex'} justifyContent={'space-between'}>
                            <Typography variant='subtitle1'>Direccion de entrega</Typography>
                            <NextLink href='/checkout/address' passHref>
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>

                        <Typography>Tobi</Typography>
                        <Typography>121 algun lugar</Typography>
                        <Typography>BA</Typography>
                        <Typography>2011</Typography>
                        <Typography>Argentina</Typography>
                        <Typography>5468685874</Typography>

                        <Divider sx={{my: 1}}/>

                        <Box display={'flex'} justifyContent={'end'}>
                            <NextLink href='/cart' passHref>
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>

                        <OrderSummary/>

                        <Box display='flex' justifyContent='space-between'>
                            <h1>Pagar</h1>
                            <Chip label='Pagar' variant='outlined' color='error' sx={{my: 2}} icon={<CreditScoreOutlined/>}/>
                        </Box>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default OrderPage
    
    
    
    
    
    
    
    // Cuando es una pagina tengo que usar rafce