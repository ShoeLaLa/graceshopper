const db = require('../db')
const Sequelize = require('sequelize')

const Cart = db.define('cart', {
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Cart
