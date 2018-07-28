const Sequelize = require('sequelize');
const db = require('../db');

const Size = db.define('size', {
    size:{
        type: Sequelize.INTEGER,
        validate:{
            notEmpty:true
        },
        primaryKey: true
    },
})

module.exports = Size