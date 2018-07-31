// ACTION TYPES //
const SET_QUANTITY = 'SET_QUANTITY'

// ACTION CREATORS //

export const setQuantity = quantity => ({
  type: SET_QUANTITY,
  quantity
})

// REDUCER //

const quantityReducer = (state = 1, action) => {
  switch (action.type) {
    case SET_QUANTITY:
      return action.quantity
    default:
      return state
  }
}

export default quantityReducer
