import axios from 'axios'

const initState = {
  allProducts: [],
  selectedProduct: {}
}

// ACTION TYPES
const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS'
const RECEIVE_SINGLE_PRODUCT = 'RECEIVE_SINGLE_PRODUCT'

// ACTION CREATORS
function actionCreatorForProducts(content) {
  return {
    type: RECEIVE_PRODUCTS,
    payload: content
  }
}

function actionCreatorForSingleProduct(content) {
  return {
    type: RECEIVE_SINGLE_PRODUCT,
    payload: content
  }
}

export const getAllProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      const action = actionCreatorForProducts(data)
      dispatch(action)
    } catch (error) {
      console.log('Could not fetch all products', error)
    }
  }
}

export const getSingleProduct = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${id}`)
      const action = actionCreatorForSingleProduct(data)
      dispatch(action)
    } catch (error) {
      console.log('Could not fetch single product', error)
    }
  }
}

const reducer = function(state = initState, action) {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return {...state, allProducts: action.payload}
    case RECEIVE_SINGLE_PRODUCT:
      return {...state, selectedProduct: action.payload}
    default:
      return state
  }
}

export default reducer
