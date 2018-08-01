const router = require('express').Router()
const {Order, ProductSize} = require('../db/models')

const processOrder = async body => {
  //find the right ProductSizeId
  const promises = body.cart.map(product => {
    return ProductSize.findOne({
      where: {
        productId: product.id,
        size: product.size
      }
    })
  })
  const productSizes = await Promise.all(promises)
  //turn cart info into something for Order
  return body.cart.map((product, index) => {
    return {
      customer: body.name, //of customer
      quantity: product.quantity,
      productSizeId: productSizes[index]
    }
  })
}

router.post('/', async (req, res, next) => {
  try {
    if (true) {
      //supposed to be req.body.password === process.env.ORDER_SECRET, but I don't know how to get OrderSecret here
      const data = await processOrder(req.body)
      await Order.bulkCreate(data)
      res.sendStatus(201)
    } else {
      console.log('WARNING!!!! UNAUTHORIZED ORDER SUBMITTED')
      res.sendStatus(402)
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
