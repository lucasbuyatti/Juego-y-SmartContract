# Smart Contract
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
### Players & Admin Flow with SUI Blockchain & Smart Contract
```mermaid
sequenceDiagram

participant P1 as Player1
participant P2 as Player2
participant Adm as Admin
participant BS as Betsystem
participant SUI

%% Game creation by Adm
Note over Adm: Admin creates the game
Adm ->> BS: create_game()
activate BS
BS -->> Adm: Game created (ID: 0x...)
deactivate BS

%% P1 joins the game (referencing the game ID)
Note over P1: Player1 decides to join the game
P1 ->> BS: player_join(&game, stake_p1)
activate BS
BS ->> SUI: Reserve stake_p1
BS -->> P1: Confirmation (Player1 registered)
deactivate BS

%% Player2 joins the same game
Note over P2: Player2 decides to join the game
P2 ->> BS: player_join(&game, stake_p2)
activate BS
BS ->> SUI: Reserve stake_p2
BS -->> P2: Confirmation (Player2 registered)
deactivate BS

%% Adm declares the winner
Note over Adm: Admin declares a winner or a tie
Adm ->> BS: declare_winner(&game, winner)
activate BS
alt If winner is valid
    BS ->> SUI: Combine bets (coin::join)
    BS ->> SUI: Transfer funds to winner
else If winner is @0x0
    BS ->> SUI: Refund to Player1 and Player2
end
BS -->> Adm: Confirmation
deactivate BS
```
# Client - Server
### Player & Server Communication
```mermaid
sequenceDiagram
    participant P1 as Player1
    participant P2 as Player2
    participant Serv as Server

    Note over P1: Wants to play
    P1->>Serv: "joinqueue" (address)
    activate Serv
    Note over Serv: addPlayersInQueue(P1.id, {P1.socket, P1.address})
    deactivate Serv

    alt Player1 leaves the queue
        P1->>Serv: "leavequeue"
        activate Serv
        Note over Serv: removePlayersFromQueue(P1.id)
        deactivate Serv
    end

    Note over P2: Wants to play
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

    loop Game in progress
        alt Player1 turn
            P1->>Serv: emit cellSelected(position)
            activate Serv
            alt Valid move
                Serv->>P1: emit updatePlayerX("X", position)
                Serv->>P2: emit updatePlayerO("X", position)
            else Invalid move
                Serv->>Serv: Do nothing
            end
            deactivate Serv
        else Player2 turn
            P2->>Serv: cellSelected(position)
            activate Serv
            alt Valid move
                Serv->>P1: emit updatePlayerX("O", position)
                Serv->>P2: emit updatePlayerO("O", position)
            else Invalid move
                Serv->>Serv: Do nothing
            end
            deactivate Serv
        end

        alt checkWinner() returns "X" or "O"
            Serv->>P1: emit("winner", winner: true/false)
            Serv->>P2: emit("winner", winner: true/false)
        else checkDraw()
            Serv->>P1: emit("draw")
            Serv->>P2: emit("draw")
        end
        Note over Serv: deleteGame(game.id)
    end

```
