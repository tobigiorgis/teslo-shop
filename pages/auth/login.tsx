import React, { useContext, useState } from 'react'
import { tesloApi } from '@/api'
import { AuthLayout } from '@/components/layouts/AuthLayout'
import { validations } from '@/utils'
import { ErrorOutline } from '@mui/icons-material'
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material'
import NextLink from 'next/link'
import { useForm } from 'react-hook-form'
import { AuthContext } from '@/context'
import { useRouter } from 'next/router'

type FormData = {
    email: string
    password: string
  }

const LoginPage = () => {

    const router = useRouter()
    const {loginUser} = useContext(AuthContext)


    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<FormData>()
      console.log({errors});
    const [showError, setShowError] = useState(false)
      

      const onLoginUser = async ({email, password}: FormData) => {
        
        setShowError(false)

        const isValidLogin = await loginUser(email, password)

        if (!isValidLogin) {
            setShowError(true)
            setTimeout(() => setShowError(false), 3000)
            return
        }

        // Navegar a la pantalla que el usuario estaba
        const destination = router.query.p?.toString() || '/'
        router.replace(destination)

      }

  return (
    <AuthLayout title='Ingresar'>
        <form onSubmit={handleSubmit(onLoginUser)} noValidate>
            <Box sx={{ width: 350, padding: '10px 20px'}}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant='h1' component='h1'>Iniciar sesion</Typography>
                        <Chip
                            label='NO reconocemos ese usuario o contraseña'
                            color='error'
                            icon={<ErrorOutline />}
                            className='fadeIn'
                            sx={{display: showError ? 'flex' : 'none'}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            type='email'
                            label='Correo'  
                            variant='filled' 
                            fullWidth
                            {
                                ...register('email', {
                                    required: 'El correo es requerido',
                                    validate: validations.isEmail
                                }) 
                            }
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label='Contraseña' 
                            type='password' 
                            variant='filled' 
                            fullWidth
                            {
                                ...register('password', {
                                    required: 'La contraseña es requerida',
                                    minLength: {value: 6, message: 'Minimo 6 caracteres'}
                                })
                            }
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button 
                            color='secondary' 
                            className='circular-btn' 
                            type='submit'
                            fullWidth>
                            Ingresar
                        </Button>
                    </Grid>

                    <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                        <NextLink href={router.query.p ? `/auth/register?p=${router.query.p}` : '/auth/register'} passHref>
                            <Link underline='always'>No tienes cuenta?</Link>
                        </NextLink>
                    </Grid>

                </Grid>
            </Box>
        </form>
    </AuthLayout>
  )
}

export default LoginPage