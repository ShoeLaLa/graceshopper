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
    // describe('inventory property',  ()=>{
    //     it('starts at 0', async ()=>{
    //         try {
    //             const newProduct = await Product.create({
    //                 name: 'shoes',
    //                 price: 100,
    //                 picture :'something.jpg',
    //             })
    //             expect(newProduct.inventory).to.be.equal(0)
                
    //         } catch (error) {
    //             console.log(error);
    //             next(error);
    //         }
    //     })
    // })


})