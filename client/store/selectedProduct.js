import axios from 'axios'

const RECEIVE_SINGLE_PRODUCT = 'RECEIVE_SINGLE_PRODUCT'

function actionCreatorForSingleProduct(content) {
  return {
    type: RECEIVE_SINGLE_PRODUCT,
    payload: content
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

const reducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_SINGLE_PRODUCT:
      return action.payload
    default:
      return state
  }
}

export default reducer
