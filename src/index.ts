import express from 'express';
import { createServer } from 'node:http';
import { Server as SocketIOServer } from 'socket.io';
import dotenv from 'dotenv';
import turnoRoutes from './routes/turno.routes.js';
import medicoRoutes from './routes/medico.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { appEventEmitter } from './services/eventEmitter.js';
import { GeneralController } from './controllers/general.controller.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: { origin: '*' }
});

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Endpoint de bienvenida (Hello World) con GeneralController
app.get('/', GeneralController.getWelcome);

// Rutas principales de la API REST
app.use('/turnos', turnoRoutes);
app.use('/medicos', medicoRoutes);

// Manejo de rutas inexistentes (404 Not Found) con GeneralController
app.use(GeneralController.handleNotFound);

// Middleware centralizado de errores
app.use(errorHandler);

io.on('connection', (socket) => {
  console.log(`Cliente WebSockets conectado: ${socket.id}`);
});

appEventEmitter.on('turno:creado', (data) => {
  io.emit('turno:nuevo', data);
});

httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});