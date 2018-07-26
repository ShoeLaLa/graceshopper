/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach( async () => {
      await User.create({
        email: codysEmail
      })
      await User.create({
        email: 'me@gmail.com',
        password: 'password1'
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })

    it('GET /api/users/:userId', async () => {
      const res = await request(app)
        .get(`/api/users/1`)
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.email).to.be.equal(codysEmail)
    })
    it('PUT /api/users/edit/password', async () => {
      const body = {
        email: 'me@gmail.com',
        oldPassword: 'password1',
        newPassword: 'password2',
      }
      await request(app)
        .put('/api/users/edit/password')
        .send(body)
        .expect(200)
        .expect( (res) => {
          expect(res.body).to.equal(true)         
        })
    })
    it('PUT /api/users/edit/password does not work on bad password', async () => {
      const body = {
        email: 'me@gmail.com',
        oldPassword: 'password',
        newPassword: 'password2',
      }
      await request(app)
        .put('/api/users/edit/password')
        .send(body)
        .expect(401)
        .expect( (res) => {
          expect(res.body).to.equal(false)
        })
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
