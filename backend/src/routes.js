const express = require('express');
const UserController = require('./controllers/UserController');
const ServiceController = require('./controllers/ServiceController');

const routes = express.Router();

routes.get('/users', UserController.index);
routes.post('/user', UserController.create);
routes.put('/user/:id', UserController.update);

routes.post('/service/:client_id', ServiceController.create);

module.exports = routes;