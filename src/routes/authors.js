const express = require('express')
const Route = express.Router()

const authorController = require('../controllers/authors')

Route
    .get('/', authorController.getAuthors) 
    .post('/', authorController.postAuthors)
    .patch('/:id', authorController.putAuthor)
    .delete('/:id', authorController.deleteAuthor)

module.exports = Route