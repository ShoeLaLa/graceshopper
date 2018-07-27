const router = require('express').Router()

class Cart {
  constructor() {
    this.products = []
  }
  get total() {
    return this.products.reduce((accum, product) => {
      return accum + product.price
    }, 0)
  }
  addProduct(product, quantity = 0) {
    const alreadyExists = this.getProduct(product.id)
    if (!alreadyExists) {
      const cloneOfProduct = Object.assign({}, ...product, quantity)
      this.products.push(cloneOfProduct)
    }
  }
  getProduct(id) {
    return this.products.find(product => {
      return product.id === id
    })
  }
  incrementQuantity(id) {
    const product = this.getProduct(id)
    if (product) {
      product.quantity += 1
    }
  }
  setQuantity(id, quantity) {
    const product = this.getProduct(id)
    if (product) {
      product.quantity = quantity
    }
  }
}

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

router.post('/', (req, res, next) => {
  try {
    if (!req.session.cart) {
      req.session.cart = []
    }
    req.session.cart.push(req.body)
    res.status(201).json(req.session.cart)
  } catch (err) {
    next(err)
  }
})

module.exports = router
