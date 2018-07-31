const User = require('./user')
const Product = require('./products')
const Cart = require('./cart')
const Size = require('./size')
const Order = require('./order')
const db = require('../db')
const Sequelize = require('sequelize')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

// Cart.belongsTo(User)
// Cart.hasMany(Product)

//THROUGH TABLE DEFINITION FOR SIZE AND PRODUCT TO BE ABLE TO ASSIGN AN INVENTORY
const ProductSize = db.define('productSize', {
  inventory: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

Size.belongsToMany(Product, {through: ProductSize, foreignKey: 'size'})
Product.belongsToMany(Size, {through: ProductSize})

Order.belongsTo(ProductSize)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  Cart,
  Size,
  ProductSize,
  Order
}
