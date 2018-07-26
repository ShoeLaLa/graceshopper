const {expect} = require('chai')
const request = require('supertest')
const app = require('../')
const db = require('../db')
const {Product} = require('../db/models')
const {products} = require('../../testData/products')

describe('/api/products', () => {
  before(async () => {
    await db.sync({force: true})
    await Product.bulkCreate(products)
  })
  it('/ returns a list of all products', async () => {
    await request(app)
      .get('/api/products/')
      .expect(200)
      .expect(res => {
        expect(res.body.length).to.equal(products.length)
      })
  })
  it('GET /api/products/:productId', async () => {
    const res = await request(app)
      .get(`/api/products/1`)
      .expect(200)

    expect(res.body).to.be.an('object')
    expect(res.body.name).to.equal('air ones')
    expect(res.body.price).to.equal(100)
    expect(res.body.picture).to.equal('./pictures/airJordan.jpg')
  })
  after(async () => {
    await db.sync({force: true})
  })
})
