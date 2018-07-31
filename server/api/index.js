const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/products', require('./product'))
router.use('/carts', require('./cart'))
router.use('/charge', require('./charge'))
router.use('/order', require('./order'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
