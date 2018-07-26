const router = require('express').Router()
const Cart = require('../db/models')

// GET /api/carts/
router.get('/:cartId', async (req, res, next) => {
  try {
    const cart = await Cart.findById(req.params.cartId)
    if (cart) {
      res.json(cart)
    } else {
      res.status(404).send()
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
