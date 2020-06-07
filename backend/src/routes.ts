import express, { request, response } from 'express';

import PlacesController from './controllers/PlacesController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();
const placesController = new PlacesController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.indexAsync);

routes.post('/places', placesController.createAsync);
routes.get('/places', placesController.indexAsync);
routes.get('/places/:id', placesController.showAsync);

export default routes;