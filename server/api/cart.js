const router = require('express').Router()

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

router.post('/:productId', (req, res, next) => {
  try {
    req.session.cart.push(req.body)
    res.send(req.session.cart)
  } catch (err) {
    next(err)
  }
})

router.put('/:productId', (req, res, next) => {
  try {
    const productToUpdate = req.session.cart.find(
      item => item.id == req.params.productId
    )
    if (productToUpdate) {
      productToUpdate.quantity = req.body.quantity
      productToUpdate.size = req.body.size
      res.send(req.session.cart)
    } else {
      next()
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
    //TODO replenish inventory by quantity
    req.session.cart = req.session.cart.filter(
      prod => prod.id != req.params.productId
    )
    res.send(req.session.cart)
  } catch (error) {
    next(error)
  }
})

module.exports = router
