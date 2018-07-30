import axios from 'axios'

// CART FRAMEWORK

// ACTION TYPES //
const UPDATE_CART = 'UPDATE_CART'
const CLEAR_CART = 'CLEAR_CART'
// ACTION CREATORS //

const clearCart = () => ({
  type: CLEAR_CART,
  cart: []
})

const refreshCart = cart => ({
  type: UPDATE_CART,
  cart
})

// THUNK CREATORS //

export const fetchCart = () => async dispatch => {
  try {
    const {data} = await axios.get(`/api/carts`)
    dispatch(refreshCart(data))
  } catch (error) {
    console.error(error)
  }
}

export const updateCart = (product, quantity, size) => async dispatch => {
  try {
    const updatedProduct = {...product, quantity, size}
    const {data} = await axios.put(`/api/carts/${product.id}`, updatedProduct)
    return dispatch(refreshCart(data))
  } catch (error) {
    console.error(error)
  }
}

export const removeProduct = productId => async dispatch => {
  try {
    const {data} = await axios.delete(`/api/carts/${productId}`)
    return dispatch(refreshCart(data))
  } catch (error) {
    console.error('Could not delete product', error)
  }
}

export const wipeCart = () => async dispatch => {
  try {
    await axios.delete('/api/carts')
    return dispatch(clearCart())
  } catch (error) {
    console.error(error)
  }
}

// REDUCER //

const cartReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_CART:
      return action.cart
    case CLEAR_CART:
      return []
    default:
      return state
  }
}

export default cartReducer
