import express, {Request, Response} from 'express';
import { createServer } from "http";
import { Server } from "socket.io";
import path from 'path';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.get('/', (req:Request, res:Response) => 
    res.sendFile(path.join(__dirname, '../public/index.html')));

app.get('/dashboard', (req:Request, res:Response) => 
    res.sendFile(path.join(__dirname, '../public/dashboard.html')));

io.on("connection", (socket) => {
    // console.log('nuevo cliente');
    socket.emit('user', 'Nuevo Espectador');
    socket.on("stream", (video) => {
        socket.broadcast.emit("stream", video);
    })
});

export = httpServer;