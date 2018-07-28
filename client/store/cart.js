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
export const updateCart = (product, quantity, size) => ({
  type: UPDATE_CART,
  product,
  quantity,
  size
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
// what I expect this to look like = [
// {productId, name, price, quantity, size},
// {productId, name, price, quantity, size},
// ...
// ]

// REDUCER //

const cartReducer = (state = cart, action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case UPDATE_CART:
      const {product, quantity, size} = action
      const theProduct = state.find(cartProduct => {
        return product.id === cartProduct.id
      })
      if (theProduct) {
        theProduct.quantity = quantity
        theProduct.size = size
        return state
      } else {
        const newProduct = {...product, quantity, size}
        return [...state, newProduct]
      }
    case CLEAR_CART:
      return []
    default:
      return state
  }
}

export default cartReducer
