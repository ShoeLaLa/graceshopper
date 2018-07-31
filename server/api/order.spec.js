const {expect} = require('chai')
const request = require('supertest')
const app = require('../')
const {order} = require('../../testData')
const db = require('../db')

describe('/api/order', () => {
  beforeEach(async () => {
    await db.sync({force: true})
  })
  it('', async () => {
    await request(app)
      .post('/api/order')
      .send(order)
      .expect(201)
  })
})
