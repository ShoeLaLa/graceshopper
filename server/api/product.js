const router = require('express').Router()
const {Product} = require('../db/models')

// GET api/products/
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
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
