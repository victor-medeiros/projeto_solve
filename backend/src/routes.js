const express = require('express');
const UserController = require('./controllers/UserController');

const routes = express.Router();

routes.get('/users', UserController.index);
routes.post('/user', UserController.create);
routes.put('/user/:id', UserController.update);

module.exports = routes;