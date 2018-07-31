const router = require('express').Router()
const Order = require('../db/models')
module.epxorts = router

const processOrder = body => {
  //do stuff
  return {
    customer: 'Lorem'
  }
}

router.post('/', async (req, res, next) => {
  try {
    if (req.body.password === process.env.ORDER_SECRET) {
      const data = processOrder(req.body)
      await Order.create(data)
      res.sendStatus(201)
    } else {
      console.log('WARNING!!!! UNAUTHORIZED ORDER SUBMITTED')
      res.sendStatus(402)
    }
  } catch (err) {
    next(err)
  }
})
