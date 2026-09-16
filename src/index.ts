import express from 'express';
import { createServer } from 'node:http';
import { Server as SocketIOServer } from 'socket.io';
import dotenv from 'dotenv';
import turnoRoutes from './routes/turno.routes.js';
import medicoRoutes from './routes/medico.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { appEventEmitter } from './services/eventEmitter.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: { origin: '*' }
});

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rutas de la API
app.use('/turnos', turnoRoutes);
app.use('/medicos', medicoRoutes);

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