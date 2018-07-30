import axios from 'axios'

//ACTION TYPES
const GET_INVENTORY = 'GET_INVENTORY'
const SET_INVENTORY = 'SET_INVENTORY'

const getInventory = inventory => {
  return {
    type: GET_INVENTORY,
    inventory
  }
}
export const fetchInventory = id => {
  return async dispatch => {
    const {data} = await axios.get(`/api/products/quantity/${id}`)
    dispatch(getInventory(data))
  }
}

export const setInventory = num => {
  return {
    type: SET_INVENTORY,
    num
  }
}

const initialState = {inventory: [], inventoryLeft: -1}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INVENTORY:
      return {...state, inventory: action.inventory}
    case SET_INVENTORY:
      return {...state, inventoryLeft: action.num}
    default:
      return state
  }
}
export default reducer
