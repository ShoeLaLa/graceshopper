import {expect} from 'chai'
import {fetchCart} from './cart'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
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
  describe('get cart by Id', () => {
    const fakeCart = {id: 1, productId: 2, userId: 4}

    it('eventually dispatches the GET CART action', async () => {
      mockAxios.onGet(`/api/carts/1`).replyOnce(200, fakeCart)
      await store.dispatch(fetchCart(1))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_CART')
      expect(actions[0].cart).to.be.deep.equal(fakeCart)
    })
  })
})
