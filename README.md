# Contrato inteligente (Smart Contract)
### Blockchain Game [Object](https://docs.sui.io/concepts/object-model)
```mermaid
classDiagram
		class  Game  {
		+UID id
		+Option<address> player1
		+Option<address> player2
		+Option<Coin<SUI>> stake_p1
		+Option<Coin<SUI>> stake_p2
		+Option<address> winner
		}
```
### Flujo de jugadores y admin con la Blockchain y el Contrato Inteligente
```mermaid
sequenceDiagram

participant P1 as Player1
participant P2 as Player2
participant Adm as Admin
participant BS as Betsystem
participant SUI

%% Game creation by Adm
Note over Adm: Admin crea el juego
Adm ->> BS: create_game()
activate BS
BS -->> Adm: Juego creado (ID: 0x...)
deactivate BS

%% P1 joins the game (referencing the game ID)
Note over P1: Player1 decide entrar al juego
P1 ->> BS: player_join(&game, stake_p1)
activate BS
BS ->> SUI: Reserva stake_p1
BS -->> P1: Confirmación (Player1 registrado)
deactivate BS

%% Player2 joins the same game
Note over P2: Player2 decide entrar al juego
P2 ->> BS: player_join(&game, stake_p2)
activate BS
BS ->> SUI: Reserva stake_p2
BS -->> P2: Confirmación (Player2 registrado)
deactivate BS

%% Adm declares the winner
Note over Adm: Admin declara un ganador o empate
Adm ->> BS: declare_winner(&game, winner)
activate BS
alt Si winner es válido
    BS ->> SUI: Combinacion de apuestas (coin::join)
    BS ->> SUI: Transferir fondos al ganador
else Si winner es @0x0
    BS ->> SUI: Devolución de fondos a Player1 y Player2
end
BS -->> Adm: Confirmación
deactivate BS
```
# Client - Server
### Player & Server Communication
```mermaid
sequenceDiagram
    participant P1 as Player1
    participant P2 as Player2
    participant Serv as Server

    Note over P1: Quiere jugar
    P1->>Serv: "joinqueue" (address)
    activate Serv
    Note over Serv: addPlayersInQueue(P1.id, {P1.socket, P1.address})
    deactivate Serv

    alt Player1 sale de la queue
        P1->>Serv: "leavequeue"
        activate Serv
        Note over Serv: removePlayersFromQueue(P1.id)
        deactivate Serv
    end

    Note over P2: Quiere jugar
    P2->>Serv: "joinqueue" (address)
    activate Serv
    Note over Serv: addPlayersInQueue(P2.id, {P2.socket, P2.address})
    deactivate Serv

    Serv->>Serv: waitingPlayers.size == 2
    Serv->>Serv: createGame()
    activate Serv
    Serv->>P1: emit("ingame")
    Serv->>P2: emit("ingame")
    deactivate Serv

    loop Juego en progreso
        alt Turno de Player1
            P1->>Serv: emit cellSelected(posición)
            activate Serv
            alt Movimiento válido
                Serv->>P1: emit updatePlayerX("X", posición)
                Serv->>P2: emit updatePlayerO("X", posición)
            else Movimiento invalido
                Serv->>Serv: Hacer nada
            end
            deactivate Serv
        else Turno de Player2
            P2->>Serv: cellSelected(posición)
            activate Serv
            alt Movimiento válido
                Serv->>P1: emit updatePlayerX("O", posición)
                Serv->>P2: emit updatePlayerO("O", posición)
            else Movimiento invalido
                Serv->>Serv: Hacer nada
            end
            deactivate Serv
        end

        alt checkWinner() devuelve "X" or "O"
            Serv->>P1: emit("winner", winner: true/false)
            Serv->>P2: emit("winner", winner: true/false)
        else checkDraw()
            Serv->>P1: emit("draw")
            Serv->>P2: emit("draw")
        end
        Note over Serv: deleteGame(game.id)
    end

```
