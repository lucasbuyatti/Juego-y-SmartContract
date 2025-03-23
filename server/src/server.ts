import cors from 'cors';
import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { addUserToList, removeUserFromList, users } from './users';
import { addPlayersInQueue, createGame, gameManager, removePlayersFromQueue } from './game';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}));

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {

    console.log("connection received:", socket.id);

    socket.on("UserAdd", (data: string) => {
    
            addUserToList(data);
    
            io.emit("TotalUsers", users.size); // Cuando alguien emite agregar usuario, cosa que pasa cuando su wallet esta conectada, se emite la cantidad de usuarios conectados
        
        });

    socket.on("joinqueue", (data: string) => {
        console.log(`${socket.id} quiere jugar`);
        addPlayersInQueue(socket.id, {socket: socket, address: data});
        
        createGame();

    });

    socket.on("leavequeue", (data: string) => {
        console.log(`${socket.id} quiere dejar de jugar`);
        removePlayersFromQueue(socket.id); // funcionando

    });

    socket.on("cellSelected", (data: number) => {
    
        gameManager(socket.id, data);
    
    });

    socket.on("disconnect", () => {
        console.log("disconnect received:", socket.id);

        removeUserFromList(socket.id);
        //console.log(users);
        io.emit("TotalUsers", users.size); // Cuando se desconecta alguien, se emite a todos los clientes la cantidad de usuarios actualizada

    });
});

server.listen(7771, () => {
    console.log("Server running on port 7771");
});