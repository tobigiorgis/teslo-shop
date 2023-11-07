import { ShopLayout } from '@/components/layouts'
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useContext } from 'react'
import {countries} from '@/utils'
import { useForm } from 'react-hook-form'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { CartContext } from '@/context';

type FormData = {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    city: string;
    zip: string;
    country: string;
    phone: string;
}

const getAddressFromCookies = (): FormData => {
    return {
        firstName: Cookies.get('firstName') || '',
        lastName : Cookies.get('lastName') || '',
        address  : Cookies.get('address') || '',
        address2 : Cookies.get('address2') || '',
        city     : Cookies.get('city') || '',
        zip      : Cookies.get('zip') || '',
        country  : Cookies.get('country') || '',
        phone    : Cookies.get('phone') || '',
    }
}

const AddressPage = () => {

    const router = useRouter()
    const {updateAddress} = useContext(CartContext)

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<FormData>({
            defaultValues: getAddressFromCookies()
      })

    const onSubmitAddress = (data: FormData) => {
        updateAddress(data)
        router.push('/checkout/summary')
    }
      
  return (
    <ShopLayout title='Dirección' pageDescription='Dirección de envío'>
        <form onSubmit={handleSubmit(onSubmitAddress)} noValidate>
            <Typography variant='h1' component={'h1'}>Direccion</Typography>

            <Grid container spacing={2} sx={{mt: 2}}>
                
                <Grid item xs={12} sm={6}>
                    <TextField 
                        label='Nombre'
                        variant='filled' 
                        fullWidth
                        {
                            ...register('firstName', {
                                required: 'Este campo es requerido',
                            })
                        }
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                        />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField 
                        label='Apellido' 
                        variant='filled' 
                        fullWidth
                        {
                            ...register('lastName', {
                                required: 'Este campo es requerido',
                            })
                        }
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                        />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField 
                        label='Direccion' 
                        variant='filled' 
                        fullWidth
                        {
                            ...register('address', {
                                required: 'Este campo es requerido',
                            })
                        }
                        error={!!errors.address}
                        helperText={errors.address?.message}
                        />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        label='Direccion 2 (opcional)' 
                        variant='filled' 
                        fullWidth
                        {
                            ...register('address2')
                        }
                        />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField 
                        label='Ciudad' 
                        variant='filled' 
                        fullWidth
                        {
                            ...register('city', {
                                required: 'Este campo es requerido',
                            })
                        }
                        error={!!errors.city}
                        helperText={errors.city?.message}
                        />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField 
                        label='Codigo Postal' 
                        variant='filled' 
                        fullWidth
                        {
                            ...register('zip', {
                                required: 'Este campo es requerido',
                            })
                        }
                        error={!!errors.zip}
                        helperText={errors.zip?.message}
                        />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth />
                        <TextField
                            select
                            variant='filled'
                            label='Pais'
                            defaultValue={Cookies.get('country') || countries[0].code}
                            {
                                ...register('country', {
                                    required: 'Este campo es requerido',
                                })
                            }
                            error={!!errors.country}
                            // helperText={errors.country?.message}
                        >
                            {
                                countries.map(country => (
                                    <MenuItem key={country.code} value={country.code}>{country.name}</MenuItem>
                                ))
                            }

                        </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField 
                        label='Telefono' 
                        variant='filled' 
                        fullWidth
                        {
                            ...register('phone', {
                                required: 'Este campo es requerido',
                            })
                        }
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                        />
                </Grid>

            </Grid>
        </form>
        <Box sx={{mt: 5}} display={'flex'} justifyContent={'center'}>
            <Button color='secondary' className='circular-btn' size='large' type='submit'>
                Realizar Pedido
            </Button>
        </Box>
    </ShopLayout>
  )
}

// export const getServerSideProps: GetServerSideProps = async ({req}) => {

//     const {token = ''} = req.cookies
//     let isValidToken = false

//     try {
//         await jwt.isValidToken(token)
//         isValidToken = true
//     } catch (error) {
//         isValidToken = false
//     }

//     if (!isValidToken) {
//         return {
//             redirect: {
//                 destination: '/auth/login?p=/checkout/address',
//                 permanent: false
//             }
//         }
//     }


//     return {
//         props:{
            
//         }
//     }
// }


export default AddressPage