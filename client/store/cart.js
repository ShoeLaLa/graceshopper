import axios from 'axios'

// CART FRAMEWORK

// ACTION TYPES //
const GET_CART = 'GET_CART'
const CLEAR_CART = 'CLEAR_CART'
const UPDATE_CART = 'UPDATE_TO_CART'

// ACTION CREATORS //
const getCart = cart => ({
  type: GET_CART,
  cart
})
const clearCart = () => ({
  type: CLEAR_CART
})

const changeCart = cart => ({
  type: UPDATE_CART,
  cart
})

export const updateCart = (product, quantity, size) => async dispatch => {
  try {
    const {data} = await axios.get('/api/carts')
    const theProduct = data.find(cartProduct => {
      return product.id === cartProduct.id
    })
    // if the product exists in the cart
    if (theProduct) {
      theProduct.quantity = quantity
      theProduct.size = size
      return dispatch(changeCart(data))
    } else {
      const newProduct = {...product, quantity, size}
      data.push(newProduct)
      return dispatch(changeCart(data))
    }
  } catch (error) {
    console.log(error)
  }
}

// THUNK CREATORS //

export const fetchCart = () => async dispatch => {
  try {
    const res = await axios.get(`/api/carts`)
    const cart = res.data
    dispatch(getCart(cart))
  } catch (error) {
    console.error(error)
  }
}

export const wipeCart = () => {
  return async dispatch => {
    await axios.put('/api/carts', [])
    dispatch(clearCart())
  }
}

export const addToCartSession = cart => {
  return async dispatch => {
    await axios.put('/api/carts', cart)
    dispatch(getCart(cart))
  }
}

// INITIAL STATE //
const cart = []

// REDUCER //

const cartReducer = (state = cart, action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case UPDATE_CART:
      return action.cart
    case CLEAR_CART:
      return []
    default:
      return state
  }
}

export default cartReducer
