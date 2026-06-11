import express from 'express';
import cors from 'cors';
import maniquiRoutes from './routers/maniqui.routes.js';
import piezaRoutes from './routers/pieza.routes.js';
import catalogoRoutes from './routers/catalogo.routes.js';
import modeloRoutes from './routers/modelo.routes.js';

const app = express();
const PORT = 3000;

const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/maniquies', maniquiRoutes);
app.use('/cabezas', (req, res, next) => { req.tipo = 'cabezas'; next(); }, piezaRoutes);
app.use('/torsos', (req, res, next) => { req.tipo = 'torsos'; next(); }, piezaRoutes);
app.use('/brazos', (req, res, next) => { req.tipo = 'brazos'; next(); }, piezaRoutes);
app.use('/piernas', (req, res, next) => { req.tipo = 'piernas'; next(); }, piezaRoutes);
app.use('/materiales', (req, res, next) => { req.tipo = 'materiales'; next(); }, catalogoRoutes);
app.use('/colores', (req, res, next) => { req.tipo = 'colores'; next(); }, catalogoRoutes);
app.use('/modelos-pieza', (req, res, next) => { req.tipo = 'modelosPieza'; next(); }, modeloRoutes);
app.use('/modelos-extremidad', (req, res, next) => { req.tipo = 'modelosExtremidad'; next(); }, modeloRoutes);

import connection from './db/dbConnect.js'

// Test de conexión
connection.query('SELECT 1')
  .then(() => console.log('Conexión a la BD exitosa'))
  .catch(err => console.error('Error de conexión:', err))

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});