const express = require('express')
const route = express.Router()

const transactionControl = require('../controllers/transactions')

route
  .get('/', transactionControl.getTransactions)
  .post('/', transactionControl.createTransactions)
  .patch('/:id', transactionControl.updateTransactions)
  .delete('/:id', transactionControl.deleteTransactions)

module.exports = route