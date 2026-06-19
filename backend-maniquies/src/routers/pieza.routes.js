import { Router } from 'express';
import piezaController from '../controllers/pieza.controller.js';

const piezaRoutes = Router();

piezaRoutes.use((req, res, next) => {
  const urlParts = req.originalUrl.split('/').filter(p => p);
  const tiposConocidos = ['cabezas', 'torsos', 'brazos', 'piernas'];
  const tipoDetectado = urlParts.find(part => tiposConocidos.includes(part));
  
  req.tipo = tipoDetectado;
  next();
});

piezaRoutes.get('/', piezaController.getPiezas);
piezaRoutes.get('/:id', piezaController.getPieza);
piezaRoutes.post('/', piezaController.createPieza);
piezaRoutes.put('/:id', piezaController.updatePieza);
piezaRoutes.delete('/:id', piezaController.deletePieza);

export default piezaRoutes;