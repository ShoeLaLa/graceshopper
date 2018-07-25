const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
    if (user) {
      res.json(user)
    } else {
      res.status(404)
      next()
    }
  } catch (error) {
    next(error)
  }
})

// PUT /api/users/edit/password
router.put('/edit/password', async (req, res, next) => {
  try {
    const user = await User.findByEmail(req.body.email)
    if (user) {
      if ( user.correctPassword(req.body.oldPassword) ){
        await user.update({
          //a hook exists to handle encrypting this
          password: req.body.newPassword,
        })
        res.json(true);
      } else {
        res.status(401).json(false);
      }
    } else {
      res.status(404)
      next()
    }
  } catch (error) {
    next(error)
  }
})
