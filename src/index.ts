import express from 'express';
import { createServer } from 'node:http';
import { Server as SocketIOServer } from 'socket.io';
import dotenv from 'dotenv';
import turnoRoutes from './routes/turno.routes.js';
import { appEventEmitter } from './services/eventEmitter.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: { origin: '*' }
});

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/turnos', turnoRoutes);

io.on('connection', (socket) => {
  console.log(`Cliente WebSockets conectado: ${socket.id}`);
});

appEventEmitter.on('turno:creado', (data) => {
  io.emit('turno:nuevo', data);
});

appEventEmitter.on('turno:actualizado', (data) => {
  io.emit('turno:actualizado', data);
});

appEventEmitter.on('turno:eliminado', (data) => {
  io.emit('turno:eliminado', data);
});

httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});