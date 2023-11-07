import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material"
import NextLink from "next/link"
import { ItemCounter } from "../ui"
import { FC, useContext } from "react"
import { CartContext } from "@/context"
import { ICartProduct } from "@/interfaces"



interface Props {
    editable?: boolean
}

export const CartList: FC<Props> = ({editable}) => {

    const {cart, updateCartQuantity, removeCartProduct} = useContext(CartContext)

    const onNewCartQuantityValue = (product: ICartProduct, newQuantityValue: number) => {
        product.quantity = newQuantityValue
        updateCartQuantity(product)
    }

  return (
    <>
    {
        cart.map(product => (
            <Grid container spacing={2} key={product.slug + product.size} sx={{mb: 1}}>
                <Grid item xs={3}>
                    <NextLink href={`/product/${product.slug}`} passHref>
                        <Link>
                            <CardActionArea>
                                <CardMedia
                                    component='img'
                                    image={`/products/${product.image}`}
                                    sx={{borderRadius: '5px'}}
                                    >
                                </CardMedia>
                            </CardActionArea>
                        </Link>
                    </NextLink>
                </Grid>
                <Grid item xs={7}>
                    <Box display={'flex'} flexDirection={'column'}>
                        <Typography variant='body1'>{product.title}</Typography>
                        <Typography variant='body1'>Talla: <strong>M</strong></Typography>

                        {
                            editable 
                            ? (
                                <ItemCounter 
                                    currentValue={product.quantity}
                                    maxValue={10} 
                                    updateQuantity={(value) => onNewCartQuantityValue(product, value)}
                                    />
                            )
                            : <Typography variant="h5">{product.quantity} {product.quantity > 1 ? 'productos' : 'producto'}</Typography>
                        }

                    </Box>
                </Grid>
                <Grid item xs={2} display={'flex'} flexDirection={'column'}>
                    <Typography variant='body1'>{`$${product.price}`}</Typography>
                    {
                        editable && (
                            <Button color="secondary" variant="text" onClick={() => removeCartProduct(product)}>
                                Remover
                            </Button>
                        )
                    }

                </Grid>

            </Grid>
        ))
    }
    </>
  )
}
