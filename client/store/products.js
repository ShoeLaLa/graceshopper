import axios from 'axios';

const allProducts = [];
const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS'
function actionCreatorForProducts(content){
    return{
        type: RECEIVE_PRODUCTS,
        payload: content
    }
}

export const getAllProducts = ()=>{
    return async (dispatch)=>{
        const {data} = await axios.get('/api/products');
        const action = actionCreatorForProducts(data);
        dispatch(action);
    }
}

const reducer = function (state = allProducts, action){
    switch (action.type){
        case RECEIVE_PRODUCTS: return action.payload;
        default: return state;
    }
}

export default reducer