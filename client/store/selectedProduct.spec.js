import {expect} from 'chai'
import {getSingleProduct} from './selectedProduct'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {
    products: [],
    selectedProduct: {}
  }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('get selected product state', () => {
    it('eventually dispatched the RECEIVED SINGLE PRODUCT action', async () => {
      const testProduct = require('../../testData/products').products[0]
      console.log('testProduct', testProduct)
      mockAxios.onGet('/api/products/1').replyOnce(200, testProduct)
      await store.dispatch(getSingleProduct(1))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('RECEIVE_SINGLE_PRODUCT')
      expect(actions[0].payload).to.be.deep.equal(testProduct)
    })
  })
})
