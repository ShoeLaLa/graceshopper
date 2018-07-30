import axios from 'axios'

// CART FRAMEWORK

// ACTION TYPES //
const GET_CART = 'GET_CART'
const CLEAR_CART = 'CLEAR_CART'
const UPDATE_CART = 'UPDATE_CART'
const DELETE_ITEM = 'DELETE_ITEM'

// ACTION CREATORS //
const getCart = cart => ({
  type: GET_CART,
  cart
})

// const addToCart = cart => ({
//   type: ADD_TO_CART,
//   cart
// })

const clearCart = () => ({
  type: CLEAR_CART
})

const changeCart = cart => ({
  type: UPDATE_CART,
  cart
})

const deleteProduct = cart => ({
  type: DELETE_ITEM,
  cart
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

// export const addToCartThunk = (product, quantity, size) => async dispatch => {
//   try {
//     const productToAdd = {...product, quantity, size}
//     const {data} = await axios.post(`/api/carts/${product.id}`, productToAdd)
//     return dispatch(addToCart(data))
//   } catch (error) {
//     console.error(error)
//   }
// }

export const updateCart = (product, quantity, size) => async dispatch => {
  try {
    const updatedProduct = {...product, quantity, size}
    const {data} = await axios.put(`/api/carts/${product.id}`, updatedProduct)
    return dispatch(changeCart(data))
  } catch (error) {
    console.error(error)
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

export const removeProduct = productId => async dispatch => {
  try {
    const {data} = await axios.delete(`/api/carts/${productId}`)
    return dispatch(deleteProduct(data))
  } catch (error) {
    console.error('Could not delete product', error)
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
    case DELETE_ITEM:
      return action.cart
    case CLEAR_CART:
      return []
    default:
      return state
  }
}

export default cartReducer
