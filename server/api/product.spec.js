const { expect } = require('chai');
const request = require('supertest');
const app = require('../');
const db = require('../db');
const { Product } = require('../db/models');
const { products } = require('../../testData/products');

describe('/api/products', ()=>{
    before( async () => {
        await db.sync({force: true});
        await Product.bulkCreate(products)
    })
    it('/ returns a list of all products', async () => {
        await request(app)
            .get('/api/products/')
            .expect(200)
            .expect( (res) => {
                expect(res.body.length).to.equal(products.length);
            })
    })
    after( async () => {
        await db.sync({force: true});
    })
})

