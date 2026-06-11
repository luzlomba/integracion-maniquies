import { Router } from 'express';
import catalogoController from '../controllers/catalogo.controller.js';

const catalogoRoutes = Router();

catalogoRoutes.get('/', catalogoController.getItems);
catalogoRoutes.get('/:id', catalogoController.getItem);
catalogoRoutes.post('/', catalogoController.createItem);
catalogoRoutes.put('/:id', catalogoController.updateItem);
catalogoRoutes.delete('/:id', catalogoController.deleteItem);

export default catalogoRoutes;