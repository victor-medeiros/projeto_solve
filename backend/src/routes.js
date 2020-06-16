const express = require('express');
const UserController = require('./controllers/UserController');
const ServiceController = require('./controllers/ServiceController');

const routes = express.Router();

routes.get('/users', UserController.index);
routes.post('/user', UserController.create);
routes.put('/user/:id', UserController.update);

routes.post('/service/:client_id', ServiceController.create);
routes.put('/service-confirm/', ServiceController.confirm);
routes.put('/service-start/', ServiceController.start);
routes.put('/service-hire/', ServiceController.hire);
routes.put('/service-finish/', ServiceController.finish);
routes.put('/service-pick-up-device/', ServiceController.pickUpDevice);

module.exports = routes;