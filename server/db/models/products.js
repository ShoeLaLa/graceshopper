const db = require('../db');
const Sequelize = require('sequelize');

const Product =  db.define('product', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    price:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    picture:{
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
})

module.exports = Product