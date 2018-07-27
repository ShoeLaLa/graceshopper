const {expect} = require('chai')
const session = require('supertest-session')
const app = require('../')
const {products, product, addedProducts} = require('../../testData/products')

describe('cart routes', () => {
  let testSession
  beforeEach(() => {
    testSession = session(app)
  })
  // it('creates a new array if empty', done => {
  //   testSession
  //     .post('/api/carts')
  //     .send(product)
  //     .expect(201)
  //     .expect(res => {
  //       expect(res.body).to.deep.equal([product])
  //     })
  //     .end(done)
  // })
  xit('handles a few added products', done => {
    //the intent is to configure the session before actually running the real test,
    //but this does not work
    //https://www.npmjs.com/package/supertest-session
    testSession.post('/api/carts').send(products[0])
    testSession.post('/api/carts').send(products[1])
    testSession.post('/api/carts').send(products[2])
    testSession
      .post('/api/carts')
      .send(product)
      .expect(201)
      .expect(res => {
        expect(res.body).to.deep.equal(addedProducts)
      })
      .end(done)
  })
})
