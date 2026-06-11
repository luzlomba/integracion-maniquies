import { Router } from 'express';
import piezaController from '../controllers/pieza.controller.js';

const piezaRoutes = Router();

piezaRoutes.get('/', piezaController.getPiezas);
piezaRoutes.get('/:id', piezaController.getPieza);
piezaRoutes.post('/', piezaController.createPieza);
piezaRoutes.put('/:id', piezaController.updatePieza);
piezaRoutes.delete('/:id', piezaController.deletePieza);

export default piezaRoutes;