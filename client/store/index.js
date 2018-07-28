import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import products from './products'
import cart from './cart'
import axios from 'axios'

const reducer = combineReducers({user, products, cart})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

const updateCart = async () => {
  const {cart} = store.getState()
  await axios.post('/api/carts', cart)
}

store.subscribe(updateCart)

export default store
export * from './user'
