const router = require('express').Router()
const {
  ProductSize
} = require('../db/models/index')

router.get('/', (req, res, next) => {
  try {
    if (!req.session.cart) {
      req.session.cart = []
    }
    res.json(req.session.cart)
  } catch (err) {
    next(err)
  }
})

router.put('/:productId', async (req, res, next) => {
  try {
    const productToUpdate = req.session.cart.find(
      item => item.id == req.params.productId
    )
    if (productToUpdate) {
      productToUpdate.quantity = req.body.quantity
      productToUpdate.size = req.body.size
      const productSize = await ProductSize.findOne({
        where: {
          productId: req.params.productId,
          size: req.body.size
        }
      })
      const inventoryLeft = productSize.dataValues.inventory - req.body.quantity
      const updated = await productSize.update({
        inventory: inventoryLeft
      })
      res.send(req.session.cart)
    } else {
      req.session.cart.push(req.body)
      res.send(req.session.cart)
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/', (req, res, next) => {
  try {
    req.session.cart = []
    res.send(req.session.cart)
  } catch (error) {
    next(error)
  }
})

router.delete('/:productId', (req, res, next) => {
  try {
    //replenish inventory by quantity
    req.session.cart = req.session.cart.filter(
      prod => prod.id != req.params.productId
    )
    console.log('session cart', req.session.cart)
    res.send(req.session.cart)
  } catch (error) {
    next(error)
  }
})

module.exports = router
