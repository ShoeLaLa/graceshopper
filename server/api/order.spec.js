const {expect} = require('chai')
const request = require('supertest')
const app = require('../')
const {productSize} = require('../../testData/order')
const db = require('../db')
const {Order, ProductSize, Product, Size} = require('../db/models')

describe('/api/order', () => {
  beforeEach(async () => {
    await db.sync({force: true})
    await Promise.all([
      Product.create({
        id: 5,
        name: 'air ones',
        price: 100,
        picture: '/pictures/airJordan.jpg'
      }),
      Size.create({
        size: 7
      })
    ])
    await ProductSize.create(productSize)
  })
  it('places an object in cart into the order properly', async () => {
    const body = {
      password: process.env.ORDER_SECRET,
      name: 'John Smith',
      cart: [
        {
          id: 5,
          name: 'air ones',
          price: 100,
          quantity: 2,
          size: 7,
          picture: './pictures/airJordan.jpg'
        }
      ]
    }
    await request(app)
      .post('/api/order')
      .send(body)
      .expect(201)

    const orderDb = await Order.findById(1)
    // expect(orderDb.customer).to.equal(body.name)
    // console.log(`testing:`, orderDb.quanitty, body.quantity)
    expect(orderDb.quantity).to.equal(body.cart[0].quantity)
    expect(orderDb.productSizeId).to.equal(productSize.id)
  })
})
