import axios from 'axios'

// CART FRAMEWORK

class Cart {
  constructor(inProductsWithSettings = []) {
    this.products = inProductsWithSettings
  }
  get total() {
    return this.products.reduce((accum, product) => {
      return accum + product.price
    }, 0)
  }
  addProduct(product, quantity = 1) {
    const alreadyExists = this.getProduct(product.id)
    if (!alreadyExists) {
      const cloneOfProduct = Object.assign({}, ...product, quantity)
      this.products.push(cloneOfProduct)
    }
  }
  getProduct(id) {
    return this.products.find(product => {
      return product.id === id
    })
  }
  incrementQuantity(id) {
    const product = this.getProduct(id)
    if (product) {
      product.quantity += 1
    }
  }
  setQuantity(id, quantity) {
    const product = this.getProduct(id)
    if (product) {
      product.quantity = quantity
    }
  }
  clearCart() {
    this.products = []
  }
}

// ACTION TYPES //
const GET_CART = 'GET_CART'
const CLEAR_CART = 'CLEAR_CART'
const ADD_CART = 'ADD_CART'

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
    const cart = new Cart(res.data)
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

const updateCart = async () => {
  const {cart} = store.getState()
  await axios.post('/api/carts', cart.products)
}

store.subscribe(updateCart)

export default cartReducer
