import { Socket } from 'socket.io';

export interface PlayerInfo {
    socket: Socket;
    address: string;
}
export interface GameState {
    id: string;
    playerX: {socket: Socket | undefined, address: string | undefined} | undefined;
    playerO: {socket: Socket | undefined, address: string | undefined} | undefined;
    board: (null | "X" | "O")[];
    currentTurn: string | undefined;
};

export let game = new Map<string, GameState>();
export let waitingPlayers = new Map<string, PlayerInfo>();

export function addPlayersInQueue(id: string, playerInfo: PlayerInfo) {
    waitingPlayers.set(id, {socket: playerInfo.socket, address: playerInfo.address});
}

export function removePlayersFromQueue(id: string) {
    waitingPlayers.delete(id);
}

function checkWinner(board: ("X" | "O" | null)[]): "X" | "O" | null {
    const winPatterns = [ 
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontales
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Verticales
        [0, 4, 8], [2, 4, 6] // Diagonales
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
}

function checkDraw(board: ("X" | "O" | null)[]): boolean {
    return board.every(cell => cell !== null) && !checkWinner(board);
}

export function createGame() {
    if (waitingPlayers.size == 2) {
         
        const playerX = waitingPlayers.get([...waitingPlayers.keys()][0])?.socket;
        const playerO = waitingPlayers.get([...waitingPlayers.keys()][1])?.socket;
        if (!playerX || !playerO) return;

        const addrX = waitingPlayers.get([...waitingPlayers.keys()][0])?.address;
        const addrO = waitingPlayers.get([...waitingPlayers.keys()][1])?.address;

        const gameId = Math.random().toString(36).substring(7);
        game.set(gameId, {
            id: gameId,
            playerX: {socket: playerX, address: addrX},
            playerO: {socket: playerO, address: addrO},
            board: [null, null, null, null, null, null, null, null, null],
            currentTurn: playerX?.id
        });

        playerX.emit("ingame");
        playerO.emit("ingame");

        // Se crea la apuesta con el jugador 1 y 2

        console.log(game);

        waitingPlayers.clear();
                
    }
}

function deleteGame(id: string) {
    game.delete(id);
}

export function gameManager(id: string, cell: number): void {
    
    game.forEach((game) => {
        if (!game.playerO || !game.playerX) return; 
        if (!game.playerO.socket || !game.playerX.socket) return; 

        if (game.currentTurn == id) { 

            if (game.board.at(cell) === "X" || game.board.at(cell) === "O") return;

            if (game.currentTurn == game.playerX.socket.id) {
                game.board[cell] = "X";

                game.playerX.socket.emit("updatePlayerX", {boardCell: game.board[cell], pos: cell});
                game.playerO.socket.emit("updatePlayerO",  {boardCell: game.board[cell], pos: cell});

            } else {
                game.board[cell] = "O";

                game.playerX.socket.emit("updatePlayerX",  {boardCell: game.board[cell], pos: cell});
                game.playerO.socket.emit("updatePlayerO",  {boardCell: game.board[cell], pos: cell});
            }

            if (id == game.playerX.socket.id) {
                game.currentTurn = game.playerO.socket.id;
            } else {
                game.currentTurn = game.playerX.socket.id;
            }

            const winner = checkWinner(game.board);
            const isDraw = checkDraw(game.board);


            // Aca va la resolucion de la apuesta y transferencia de SUIS al ganador
            if (winner) {
                if (winner === "X") {
                    game.playerX.socket.emit("winner", true);
                    game.playerO.socket.emit("winner", false);
                    deleteGame(game.id);
                } else {
 
                    game.playerO.socket.emit("winner", true);
                    game.playerX.socket.emit("winner", false);
                    deleteGame(game.id);
                }
            }

            if (isDraw) {
                game.playerO.socket.emit("draw");
                game.playerX.socket.emit("draw");
                deleteGame(game.id);
            }


        } 
    });
}