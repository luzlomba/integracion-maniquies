import { Router } from 'express';
import maniquiController from '../controllers/maniqui.controller.js';

const maniquiRoutes = Router();

maniquiRoutes.get('/', maniquiController.getManiquies);
maniquiRoutes.get('/:id', maniquiController.getManiqui);
maniquiRoutes.post('/', maniquiController.createManiqui);
maniquiRoutes.put('/:id', maniquiController.updateManiqui);
maniquiRoutes.delete('/:id', maniquiController.deleteManiqui);

export default maniquiRoutes;