import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import products from './products'
import cart from './cart'
import axios from 'axios'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2'

const persistConfig = {
  key: 'root',
  storage: storage
  // stateReconciler: autoMergeLevel2
}

const reducer = combineReducers({user, products, cart})
const persistedReducer = persistReducer(persistConfig, reducer)

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(persistedReducer, middleware)

const updateCart = async () => {
  const {cart} = store.getState()
  await axios.post('/api/carts', cart)
}

store.subscribe(updateCart)

export default store
export const persistor = persistStore(store)
export * from './user'
