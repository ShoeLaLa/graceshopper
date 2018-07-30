import {expect} from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import cartReducer, {fetchCart, updateCart} from './cart'
import {cartProducts, newProduct, addedCartProducts} from '../../testData/cart'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('cart thunk creators', () => {
  let store
  let mockAxios

  const initialState = {}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })
  // it('get cart from session and eventually dispatches the GET CART action', async () => {
  //   mockAxios.onGet(`/api/carts`).replyOnce(200, fakeCart)
  //   await store.dispatch(fetchCart())
  //   const actions = store.getActions()
  //   expect(actions[0].type).to.be.equal('GET_CART')
  //   expect(actions[0].cart).to.be.deep.equal(fakeCart)
  // })

  // it('adds a new product to session and store', async () => {
  //   mockAxios.onPost('/api/carts', newProduct).reply(201, addedProducts)
  //   await store.dispatch(addToCartSession(newProduct))
  //   const actions = store.getActions()
  //   expect(actions[0].type).to.equal('GET_CART')
  //   expect(actions[0].cart).to.deep.equal(addedProducts)
  // })
})

describe('actions', () => {
  xit('adds a thing to cart', () => {
    expect(
      cartReducer(cartProducts, updateCart(newProduct, 1, 7))
    ).to.deep.equal(addedCartProducts)
  })
  xit('updates quantity correctly', () => {
    expect(
      cartReducer(cartProducts, updateCart(newProduct, 1, 7))
    ).to.deep.equal(addedCartProducts)
  })
  xit('deletes properly', () => {})
})
