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
  console.log('receiving cart:', req.body)
  try {
    req.session.cart = req.body
  } catch (err) {
    next(err)
  }
})

// router.post('/', (req, res, next) => {
//   try {
//     if (!req.session.cart) {
//       req.session.cart = {products: []}
//     }
//     req.session.cart.push(req.body)
//     res.status(201).json(req.session.cart)
//   } catch (err) {
//     next(err)
//   }
// })

module.exports = router
