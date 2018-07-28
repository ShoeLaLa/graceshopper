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

router.put('/', (req, res, next) => {
  try {
    req.session.cart = req.body
    res.json(req.session.cart)
  } catch (err) {
    next(err)
  }
})

module.exports = router
