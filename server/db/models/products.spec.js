const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', ()=>{
    beforeEach(()=>{
        return db.sync({force: true})

    })
    describe('name checking validation',  ()=>{
        it('requires a name', async ()=>{
            try {
                await Product.create({
                    price: 100
                })
                throw(new Error());
                
            } catch (error) {
                expect(error.name).to.be.equal('SequelizeValidationError');
            }
        })
    })


})