import axios from 'axios'

// CART FRAMEWORK

// cart = new Cart()
// cart.products
// cart.total

// class Cart {
//   constructor(inProducts = []) {
//     this.products = inProducts
//     []
//   }
//   get total() {
//     return this.products.reduce((accum, product) => {
//       return accum + product.price
//     }, 0)
//   }
//   addProduct(product, quantity = 1) {
//     const alreadyExists = this.getProduct(product.id)
//     if (!alreadyExists) {
//       const cloneOfProduct = Object.assign({}, ...product, quantity)
//       this.products.push(cloneOfProduct)
//     }
//     return this.products
//   }
//   getProduct(id) {
//     return this.products.find(product => {
//       return product.id === id
//     })
//   }
//   incrementQuantity(id) {
//     const product = this.getProduct(id)
//     if (product) {
//       product.quantity += 1
//     }
//   }
//   setQuantity(id, quantity) {
//     const product = this.getProduct(id)
//     if (!product){

//     }
//     if (product) {
//       product.quantity = quantity
//     }
//   }
//   clearCart() {
//     this.products = []
//   }
// }

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
export const updateCart = (product, quantity) => ({
  type: UPDATE_CART,
  product,
  quantity
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
    case UPDATE_CART:
      const {product, quantity} = action
      const theProduct = state.find(cartProduct => {
        return product.id === cartProduct.id
      })
      if (theProduct) {
        theProduct.quantity = quantity
        return state
      } else {
        const newProduct = {...product, quantity}
        return [...state, newProduct]
      }
    case CLEAR_CART:
      return []
    default:
      return state
  }
}

export default cartReducer
