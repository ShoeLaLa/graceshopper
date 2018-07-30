const router = require('express').Router()
const stripe = require('stripe')(
  process.env.STIPE_KEY || 'sk_test_GXWVxU9V8CNHM99pcwrk9UZc' //dummy id
)

// POST /api/charge/
router.post('/', async (req, res, next) => {
  try {
    let {status} = await stripe.charges.create({
      amount: req.body.amount,
      currency: 'usd',
      description: 'An example charge',
      source: req.body.token
    })

    res.json({status})
  } catch (err) {
    next(err)
  }
})

module.exports = router
