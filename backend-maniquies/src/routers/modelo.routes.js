import { Router } from 'express';
import modeloController from '../controllers/modelo.controller.js';

const modeloRoutes = Router();

modeloRoutes.get('/', modeloController.getModelos);
modeloRoutes.get('/:id', modeloController.getModelo);
modeloRoutes.post('/', modeloController.createModelo);
modeloRoutes.put('/:id', modeloController.updateModelo);
modeloRoutes.delete('/:id', modeloController.deleteModelo);

export default modeloRoutes;