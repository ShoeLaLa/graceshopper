import axios from 'axios'

// ACTION TYPES //
const GET_CART = 'GET_CART'

// ACTION CREATORS //
const getCart = cart => ({
  type: GET_CART,
  cart
})

// THUNK CREATORS //

export const fetchCart = cartId => async dispatch => {
  try {
    const res = await axios.get(`/api/carts/${cartId}`)
    const cart = res.data
    dispatch(getCart(cart))
  } catch (error) {
    console.error(error)
  }
}

// INITIAL STATE //
const cart = {}

// REDUCER //

const cartReducer = (state = cart, action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart
    default:
      return state
  }
}

export default cartReducer
