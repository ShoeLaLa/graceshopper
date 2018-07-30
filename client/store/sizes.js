import axios from 'axios'

const GET_SIZES = 'GET_SIZES'
const SELECTED_SIZE = 'SELECTED_SIZE'

const getSizes = sizes => {
  return {
    type: GET_SIZES,
    sizes
  }
}
export const fetchSizes = id => {
  return async dispatch => {
    const {data} = await axios.get(`/api/products/size/${id}`)
    const action = getSizes(data)
    dispatch(action)
  }
}

export const selectSize = size => {
  return {
    type: SELECTED_SIZE,
    size
  }
}

const initialState = {allSizes: [], selectedSize: 0}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SIZES:
      return {...state, allSizes: action.sizes}
    case SELECTED_SIZE:
      return {...state, selectedSize: action.size}
    default:
      return state
  }
}

export default reducer
