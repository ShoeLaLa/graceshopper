const db = require('../db')
const Sequelize = require('sequelize')

const Order = db.define('order', {
  customer: {
    type: Sequelize.STRING,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Order
