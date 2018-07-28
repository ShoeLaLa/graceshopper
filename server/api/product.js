const router = require('express').Router()
const {Product, ProductSize, Size} = require('../db/models')

// GET api/products/
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/findAll', async(req,res,next)=>{
  try {
    const allIncluded = await Product.findAll({
      include: [Size]
    })
    console.log(allIncluded)
    res.json(allIncluded);
  } catch (error) {
    console.log('error on /findAll', error);
    next(error);
    
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId)
    if (product) {
      res.json(product)
    } else {
      res.status(404)
      next()
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
