const router = require('express').Router()
const {Product, Size} = require('../db/models')

// GET api/products/
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

// GET api/products/
router.get('/findAll', async (req, res, next) => {
  try {
    const allIncluded = await Product.findAll({
      include: [Size]
    })
    res.json(allIncluded)
  } catch (error) {
    console.log('error on /findAll', error)
    next(error)
  }
})

// GET api/products/
router.get('/size/:id', async (req, res, next) => {
  try {
    const product = await Product.findAll({
      include: [Size],
      where: {
        id: req.params.id
      }
    })
    const allSizes = product[0].sizes.map(elem => elem.size)
    res.json(allSizes)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

// GET api/products/
router.get('/quantity/:id', async (req, res, next) => {
  try {
    const product = await Product.findAll({
      include: [Size],
      where: {
        id: req.params.id
      }
    })
    const inventory = product[0].sizes.map(elem => elem.productSize)
    res.json(inventory)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

// GET api/products/
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
