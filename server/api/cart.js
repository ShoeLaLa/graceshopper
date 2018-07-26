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

router.get('/', (req, res, next) => {
  try {
    if (req.user){
      if (!req.user.cart){
        req.user.cart = []
      }
      console.log(req.session);
      res.json(req.session);
    }
    else {
      if (!req.session.cart){
        req.session.cart = [];
      }
      console.log(req.session);
      res.json(req.session);
    }
  } catch (err){
    next(err);
  }
})

router.post('/', (req, res, next) => {
  try {
    if (!req.session.cart){
      req.session.cart = [];
    }
    req.session.cart.push( req.body.id )
    res.sendStatus(201)
  } catch (err){
    next(err);
  }
})

module.exports = router
