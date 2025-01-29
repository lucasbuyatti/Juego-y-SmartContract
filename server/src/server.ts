import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'node:http';

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
    console.log("Usuario conectado", socket.id);

    socket.on("disconnect", () => {
        console.log("Usuario desconectado", socket.id);


    });

});



server.listen(3333, () => {
    console.log("Server running on port 3333");
});