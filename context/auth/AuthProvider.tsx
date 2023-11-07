import { FC, useEffect, useReducer } from 'react';
import { AuthContext, authReducer } from './';
import { IUser } from '@/interfaces';
import { tesloApi } from '@/api';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';


interface Props {
    children: React.ReactNode;
 }

export interface AuthState {
   isLoggedIn: boolean;
   user?: IUser;
   
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined
};



export const AuthProvider:FC<Props> = ({children}) => {

    const router = useRouter()

   const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE)

   useEffect(() => {
    checkToken()
   },[])

   const checkToken = async () => {

    if (!Cookies.get('token')) return 
        
    try {
        // llamar al endpoint
        const {data} = await tesloApi.get('/user/validate-token');
        // revalidar token guardando el nuevo
        const {token, user} = data
        Cookies.set('token', token);
        // dispatch login
        dispatch({type: 'Auth - Login', payload: user});
        
    } catch (error) {
        // MAL
        // borrar el token de las cookies
        Cookies.remove('token');
        return false
        
    }

   }

   const loginUser = async (email: string, password: string): Promise<boolean> => {

    try {
        const {data} = await tesloApi.post('/user/register', {email, password});
        const {token, user} = data
        Cookies.set('token', token);
        dispatch({type: 'Auth - Login', payload: user});
        return true

    } catch (error) {
        return false
    }


   }

   const registerUser = async (name: string, email: string, password: string): Promise<{hasError: boolean; message?: string}> => {
        try {
            const {data} = await tesloApi.post('/user/register', {email, password, name});
            const {token, user} = data
            Cookies.set('token', token);
            dispatch({type: 'Auth - Login', payload: user});
            return {
                hasError: false
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }

            return {
                hasError: true,
                message: 'Error al crear el usuario'
            }
        }
   }

   const logout = () => {
        Cookies.remove('token');
        Cookies.remove('cart')
        router.reload()
         
   }

  return (
   <AuthContext.Provider value={{
        ...state,

        // Methods
        loginUser,
        registerUser,
        logout
    }}>
       {children}
   </AuthContext.Provider>
  )
}