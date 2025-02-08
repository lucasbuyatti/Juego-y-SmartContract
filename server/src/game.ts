import { Socket } from 'socket.io';

export interface GameState {
    playerX: string;    // ID del jugador con X
    playerO: string;    // ID del jugador con O
    board: (null | "X" | "O")[];
    currentTurn: string;
};

export let game = new Set<GameState>();

let waitingPlayers: { id: string; socket: Socket }[] = [];

export function createGame(id: string, socket: Socket) {
    
    waitingPlayers.push({ id, socket });
    
    
    if (waitingPlayers.length === 2) {
        const playerX = waitingPlayers[0];
        const playerO = waitingPlayers[1];
        
        const newGame: GameState = {
            playerX: playerX.id,
            playerO: playerO.id,
            board: Array(9).fill(null),
            currentTurn: playerX.id, 
        };
        
        
        playerX.socket.emit("ingame", { game: newGame });
        playerO.socket.emit("ingame", { game: newGame });

        // Agregar el juego al Set de juegos activos
        game.add(newGame);
        
        // Reiniciar la lista de espera
        waitingPlayers = [];
    }
}

export function gameManager(socket: Socket) {
    // Lógica adicional para la gestión del juego
}
