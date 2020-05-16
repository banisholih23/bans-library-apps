const express = require('express')
const route = express.Router()

const statusController = require('../controllers/book_status')

route
    .get('/', statusController.getStatus)
    .post('/', statusController.postStatus)
    .patch('/:id', statusController.putStatus)
    .delete('/:id', statusController.deleteStatus)

module.exports = route