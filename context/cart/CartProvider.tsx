import { FC, useEffect, useReducer } from 'react';
import { CartContext, cartReducer } from './';
import { ICartProduct } from '@/interfaces';
import Cookie from 'js-cookie'
import { OrderSummary } from '@/components/cart';


interface Props {
    children: React.ReactNode;
 }

export interface CartState {
    isLoaded: boolean;
    cart: ICartProduct[];
    numberOfItems: number;
    subtotal: number;
    tax: number;
    total: number;

    shippingAddress?: ShippingAddress;
}

export interface ShippingAddress {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    city: string;
    zip: string;
    country: string;
    phone: string;
}

const CART_INITIAL_STATE: CartState = {
    isLoaded: false,
    cart: [],
    numberOfItems: 0,
    subtotal: 0,
    tax: 0,
    total: 0,
    shippingAddress: undefined
};


export const CartProvider:FC<Props> = ({children}) => {

   const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE)

   useEffect(() => {
    try {
        const cookieProducts = Cookie.get('cart') ? JSON.parse( Cookie.get('cart')! ) : []
        dispatch({type: 'Cart - LoadCart from cookies | storage', payload: cookieProducts})
    } catch {
        dispatch({type: 'Cart - LoadCart from cookies | storage', payload: []})
    }
   
   }, [])

   useEffect(() => {

    if (Cookie.get('firstName')) { 
        const shippingAddress = {
            firstName: Cookie.get('firstName') || '',
            lastName : Cookie.get('lastName') || '',
            address  : Cookie.get('address') || '',
            address2 : Cookie.get('address2') || '',
            city     : Cookie.get('city') || '',
            zip      : Cookie.get('zip') || '',
            country  : Cookie.get('country') || '',
            phone    : Cookie.get('phone') || '',
        }
        dispatch({type: 'Cart - LoadAddress from Cookies', payload: shippingAddress})
    }  
   }, [])
   
   

   // Uso de cookies para guardar el carrito

   useEffect(() => {
     Cookie.set('cart', JSON.stringify(state.cart))
   }, [state.cart])

   useEffect(() => {

        const numberOfItems = state.cart.reduce((prev, current) => current.quantity + prev, 0);
        const subTotal = state.cart.reduce((prev, current) => (current.price * current.quantity) + prev, 0);
        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0)
        
        const orderSummary = {
            numberOfItems,
            subTotal,
            tax: subTotal * taxRate,
            total: subTotal * (taxRate + 1)
        }

        dispatch({type: 'Cart - Update order summary', payload: orderSummary})
   
   }, [state.cart])
   
   
   // Fin

   const addProductToCart = (product: ICartProduct) => {

    const productInCart = state.cart.some(item => item._id === product._id)
    if (!productInCart) {
        return dispatch({type: 'Cart - Update products in cart', payload: [...state.cart, product]})
    }

    const productInCartButDifferentSize = state.cart.some(item => item._id === product._id && item.size === product.size)
    if (!productInCartButDifferentSize) {
        return dispatch({type: 'Cart - Update products in cart', payload: [...state.cart, product]})
    }

    // Acumular cantidad
    const updatedProducts = state.cart.map(item => {
        if (item._id !== product._id) return item;
        if (item.size !== product.size) return item;

        // Actualizar cantidad
        item.quantity += product.quantity
        return item
    })

    dispatch({type: 'Cart - Update products in cart', payload: updatedProducts})
   }


   const updateCartQuantity = (product: ICartProduct) => {
    dispatch({type: 'Cart - Change cart quantity', payload: product})
   }

   const removeCartProduct = (product: ICartProduct) => {
    dispatch({type: 'Cart - Remove product in cart', payload: product})
   }

   const updateAddress = (address: ShippingAddress) => {
    Cookie.set('firstName', address.firstName);
    Cookie.set('lastName', address.lastName);
    Cookie.set('address', address.address);
    Cookie.set('address2',address.address2 || '');
    Cookie.set('city', address.city);
    Cookie.set('zip', address.zip);
    Cookie.set('country', address.country);
    Cookie.set('phone', address.phone);

    dispatch({type: 'Cart - Update Address', payload: address})
   }

  return (
   <CartContext.Provider value={{
    ...state,

    // Methods
    addProductToCart,
    updateCartQuantity,
    removeCartProduct,
    updateAddress
}}
    >
       {children}
   </CartContext.Provider>
  )
}