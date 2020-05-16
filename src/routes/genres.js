const express = require('express')
const route = express.Router()

const genreController = require('../controllers/genres')

route
    .get('/', genreController.getGenres) //
    .post('/', genreController.postGenres)
    .patch('/:id', genreController.putGenres)
    .delete('/:id', genreController.deleteGenres)

module.exports = route