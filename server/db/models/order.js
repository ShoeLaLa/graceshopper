const db = require('../db')
const Sequelize = require('sequelize')

const Order = db.define('order', {
  customer: {
    type: Sequelize.STRING
  },
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = Order
