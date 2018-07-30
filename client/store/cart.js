import axios from 'axios'

// CART FRAMEWORK

// ACTION TYPES //
const GET_CART = 'GET_CART'
const CLEAR_CART = 'CLEAR_CART'
const UPDATE_CART = 'UPDATE_TO_CART'
const DELETE_ITEM = 'DELETE_ITEM'

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

const deleteProduct = cart => ({
  type: DELETE_ITEM,
  cart
})

export const updateCart = (product, quantity, size) => (dispatch, getState) => {
  try {
    const {cart} = getState()
    const theProduct = cart.find(cartProduct => {
      return product.id === cartProduct.id
    })
    // if the product exists in the cart
    if (theProduct) {
      theProduct.quantity = quantity
      theProduct.size = size
      return dispatch(changeCart(cart))
    } else {
      const newProduct = {...product, quantity, size}
      cart.push(newProduct)
      return dispatch(changeCart(cart))
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

export const removeProduct = productId => async (dispatch, getState) => {
  try {
    const res = getState()
    const currentCart = res.cart
    if (currentCart) {
      const product = currentCart.find(item => item.id == productId)
      const indexOfProduct = currentCart.indexOf(product)
      const newCart = currentCart
        .slice(0, indexOfProduct)
        .concat(currentCart.slice(indexOfProduct + 1))
      dispatch(deleteProduct(newCart))
    }
  } catch (error) {
    console.log('Could not delete product', error)
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
