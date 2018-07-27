import axios from 'axios'

// ACTION TYPES //
const GET_CART = 'GET_CART'
const CLEAR_CART = 'CLEAR_CART'

// ACTION CREATORS //
const getCart = cart => ({
  type: GET_CART,
  cart
})
const clearCart = () => ({
  type: CLEAR_CART
})

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

export const addToCartSession = product => {
  return async dispatch => {
    const response = await axios.post('/api/carts', product)
    dispatch(getCart(response.data))
  }
}

// INITIAL STATE //
const cart = []

// REDUCER //

const cartReducer = (state = cart, action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case CLEAR_CART:
      return []
    default:
      return state
  }
}

export default cartReducer
