const express = require('express')
const Route = express.Router()

const auth = require('../controllers/authentication');

Route
    .get('/users', auth.getAllUsers)
    .post('/register', auth.postSignUp)
    .post('/login', auth.postSignIn)    
    .delete('/users/:id', auth.deleteUsers)
    
module.exports = Route