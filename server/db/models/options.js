const Sequelize = require('sequelize')
const db = require('../db')

const Options = db.define('options', {
  title: {
    type: Sequelize.STRING
  },
  count: {
    type: Sequelize.INTEGER
  },
  total: {
    type: Sequelize.INTEGER
  }
})

module.exports = Options
