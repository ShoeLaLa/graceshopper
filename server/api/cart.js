const router = require('express').Router()

router.get('/', (req, res, next) => {
  try {
    if (!req.session.cart) {
      req.session.cart = {products: []}
    }
    res.json(req.session.cart)
  } catch (err) {
    next(err)
  }
})

router.post('/', (req, res, next) => {
  try {
    if (!req.session.cart) {
      req.session.cart = {products: []}
    }
    req.session.cart.push(req.body)
    res.status(201).json(req.session.cart)
  } catch (err) {
    next(err)
  }
})

module.exports = router
