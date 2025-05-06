# About

I spent a good amount of time in the **crypto** and casino world (even though I’m not a fan of it, haha), which led me to the idea of building a smart contract on the Sui blockchain that stores players items and declares the winner of a game.

# Project Self-Critique
### Frontend
- The frontend is currently a mess. I’ve never worked with frontend development or React before, so the result is not that good

### Smart Contract Integration
- The smart contract is not yet integrated into the web frontend and backend

- The basic game flow I had in mind:

	- Player 1 joins the queue. The “admin” automatically creates the on-chain object. Player 1 is then locked into the game.
	- Player 2 joins the queue, and the game starts.

### Gas Fees (Admin Side)
One major issue not yet addressed is gas fee management on the admin side

- My idea to handle this is that both Player 1 and Player 2 would pay a small fee to the admin when a game is created

### Hibrid?
Another major issue is the power of the admin address, as it can create the game and declare a winner. Is this a problem? Not so much, because the assert functions prevent any "superpowers" from the admin. However, the essence of blockchain is decentralization, but what led me to treat this project as a hybrid is that I developed it with no prior knowledge of smart contracts, React, or ExpressJS

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
