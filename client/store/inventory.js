import axios from 'axios'

const GET_INVENTORY = 'GET_INVENTORY'
// better variable name ("getInventory")
const actionCreator = (inventory)=>{
    return{
        type: GET_INVENTORY,
        payload: inventory
    }
}

// better variable name ("fetchInventory")
export const getInventory=(id)=>{
    return async(dispatch)=>{
        const {data} = await axios.get(`/api/products/quantity/${id}`)
        const action = actionCreator(data);
        dispatch(action)
    }
}

const SET_INVENTORY = 'SET_INVENTORY'
export const setInventory = (num)=>{
    return{
        type: SET_INVENTORY,
        payload: num
    }
}

const initialState = {inventory: [], inventoryLeft: -1}
const reducer = (state = initialState, action)=>{
    switch(action.type){
        case GET_INVENTORY: return {...state, inventory: action.payload}
        case SET_INVENTORY: return {...state, inventoryLeft: action.payload}
        default: return state
    }
}
export default reducer
