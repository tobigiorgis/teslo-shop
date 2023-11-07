import { tesloApi } from '@/api'
import NextLink from 'next/link'
import { AuthLayout } from '@/components/layouts/AuthLayout'
import { validations } from '@/utils'
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { type } from 'os';
import { ErrorOutline } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { AuthContext } from '@/context'

type FormData = {
    name: string
    email: string
    password: string
  }

const RegisterPage = () => {

    const router = useRouter()
    const {registerUser} = useContext(AuthContext)

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<FormData>()
      console.log({errors});
      const [showError, setShowError] = useState(false)
      const [errorMessage, setErrorMessage] = useState('')
      
    const onRegisterForm = async ({name, email, password}: FormData) => {

        setShowError(false)
        const {hasError, message} = await registerUser(name, email, password)

        if (hasError) {
            setShowError(true)
            setErrorMessage(message!)
            setTimeout(() => {
                setShowError(false)
            }, 3000);
            return
        }

        const destination = router.query.p?.toString() || '/'
        router.replace(destination)

        try {
            const {data} = await tesloApi.post('/user/register', {name, email, password})
            const {token, user} = data
            console.log({token, user});
            


        } catch (error) {
            console.log(error)
            setShowError(true)
            setTimeout(() => {
                setShowError(false)
            }, 3000);
        }
        
    }


  return (
    <AuthLayout title='Registrar'>
        <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
            <Box sx={{ width: 350, padding: '10px 20px'}}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant='h1' component='h1'>Registrar</Typography>
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
                            label='Nombre Completo'    
                            variant='filled' 
                            fullWidth 
                            {
                                ...register('name', {
                                    required: 'Este campo es requerido ',
                                    minLength: {value: 2, message: 'Minimo 2 caracteres'}
                                })
                            }
                            error={!!errors.password}
                            helperText={errors.password?.message}
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
                        <Button type='submit' color='secondary' className='circular-btn' fullWidth>
                            Ingresar
                        </Button>
                    </Grid>

                    <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                        <NextLink href={router.query.p ? `/auth/login?p=${router.query.p}` : '/auth/login'} passHref>
                            <Link underline='always'>Ya tienes cuenta?</Link>
                        </NextLink>
                        
                    </Grid>

                </Grid>
            </Box>
        </form>
    </AuthLayout>
  )
}

export default RegisterPage