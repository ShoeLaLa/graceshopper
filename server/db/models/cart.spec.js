const {expect} = require('chai')
const db = require('../index')
const Cart = db.model('cart')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  describe('name checking validation', () => {
    it('requires a product id', async () => {
      try {
        await Cart.create()
        throw new Error()
      } catch (error) {
        expect(error.name).to.be.equal('SequelizeValidationError')
      }
    })
  })
})
