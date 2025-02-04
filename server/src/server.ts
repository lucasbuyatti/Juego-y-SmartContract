import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import { addUserToList, createUsers, Player, removeUserFromList, users, UserState } from './users';

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

    // Agrego al array al usuario que se conecta
    socket.on("UserAdd", (data: UserState) => {

        const player: Player = {
            socketId: socket.id,
            usrState: {
                address: data.address,
                coinBalance: data.coinBalance,
                coinType: data.coinType,
                walletIsConnected: data.walletIsConnected
            } as UserState
        };

        addUserToList(player);

        io.emit("TotalUsers", users.size); // Cuando alguien se conecta, manda la cantidad de usuarios conectados.
        
        console.log(users);
    });

    // Elimino del array al usuario que se desconecta
    socket.on("disconnect", () => { 
        console.log("disconnect received:", socket.id);
        
        removeUserFromList(socket.id);

        io.emit("TotalUsers", users.size); // Cuando alguien se desconecta, manda la cantidad de usuarios conectados.
        
        console.log(users);


    }); 
});



server.listen(7771, () => {
    console.log("Server running on port 7771");
});