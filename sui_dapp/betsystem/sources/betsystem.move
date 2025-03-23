module betsystem::betsystem {
    // === Imports ===

    // ---------------------------------------- ESTOS ESTAN IMPORTADOS POR DEFAULT
    // use sui::coin::{Self, Coin};
    // use sui::transfer;
    // use sui::tx_context::{Self, TxContext};
    // ---------------------------------------- ESTOS ESTAN IMPORTADOS POR DEFAULT

    // use sui::test_scenario;
    // use sui::balance::Balance;
    // use sui::sui;
    use sui::sui::SUI;
    use sui::coin::Coin;
    use sui::coin;
    // use std::option; // No lo uso
    // === Errors ===
    const EPlayerInGame: u64 = 0;
    const EGameIsFull: u64 = 1;
    const EIsNotAdmin: u64 = 2;
    // const ENoFunds: u64 = 3; // No lo uso
    const EInvalidPlayer: u64 = 4; // No lo uso

    const EAlrdyAWinner: u64 = 5;
    // === Constants ===
    
    const Admin: address = @0x5e27cc7ca78e759e5dcc8377310b8452cdfdd3d84bdd2ce26466645db1ad3df3;

    // === Structs ===
    public struct Game has key, store {
        id: UID,
        player1: Option<address>,
        player2: Option<address>,
        stake_p1: Option<Coin<SUI>>,
        stake_p2: Option<Coin<SUI>>,
        winner: Option<address>,
    }

    // === Events ===
    // === Method Aliases ===
    // === Public Functions ===

    public entry fun player_join(game: &mut Game, stake: Coin<SUI>, ctx: &mut TxContext) {
        let player = tx_context::sender(ctx);

        assert!(
            !option::contains(&game.player1, &player) &&
            !option::contains(&game.player2, &player),
            EPlayerInGame
        );

        if (option::is_none(&game.player1)) {
            option::fill(&mut game.player1, player);
            option::fill(&mut game.stake_p1, stake);
        } else if (option::is_none(&game.player2)) {
            option::fill(&mut game.player2, player);
            option::fill(&mut game.stake_p2, stake);
        } else {
            abort EGameIsFull
        };
    }
    
    // === View Functions ===
    // === Admin Functions ===

    // Tip: ctx Siempre al final de los parametros de la funcion

    // Creo el juego, actualmente no tiene player1 ni player2, porque solo se crea el juego si ambos players estan en queue. Si no, no
    public entry fun create_game(ctx: &mut TxContext) {

        let signer = tx_context::sender(ctx);

        assert!(signer == Admin, EIsNotAdmin);

        let game = Game {
            id: object::new(ctx),
            player1: option::none<address>(),
            player2: option::none<address>(),
            stake_p1: option::none<Coin<SUI>>(),
            stake_p2: option::none<Coin<SUI>>(),
            winner: option::none<address>(), // Cuidado con las estructuras y los enums 1 hora y 30 minutos buscando para que funcione :p
        };
        
        transfer::share_object(game); // Restricciones de quienes interactuan con el contrato
    }

    public entry fun declare_winner(game: &mut Game, winner: address, ctx: &mut TxContext) {
        let signer = tx_context::sender(ctx);

        assert!(signer == Admin, EIsNotAdmin); // El que hace la transaccion triene que ser la variable Admin
        assert!(!option::contains(&game.player1, &winner) || !option::contains(&game.player2, &winner), EInvalidPlayer);


        if (winner == @0x0) {
            refund_to_players(game);
        } else {
            if (option::is_none(&game.winner)) { // Si winner esta vacio
                option::fill(&mut game.winner, winner); // Declarar ganador
            }; // 
            
            pay_to_winner(game, winner);
        };

       
    }

    // === Package Functions ===

    // === Private Functions ===

    public fun refund_to_players(game: &mut Game) { // Extract esta mal convierte "algo" en "nada"
        assert!(option::is_none(&game.winner), EAlrdyAWinner);

        
        let player1_address = *option::borrow(&game.player1);
        let player2_address = *option::borrow(&game.player2);

        let stake_p1 = option::extract(&mut game.stake_p1);
        let stake_p2 = option::extract(&mut game.stake_p2);

        transfer::public_transfer(stake_p1, player1_address);
        transfer::public_transfer(stake_p2, player2_address);
    }

    public fun pay_to_winner(game: &mut Game, winner: address) {
        
        // 1. Extraer los Coin del Option
        let stake_p1 = option::extract(&mut game.stake_p1);
        let stake_p2 = option::extract(&mut game.stake_p2);

        // 2. Combinar las monedas correctamente
        let mut combined = stake_p1;
        coin::join(&mut combined, stake_p2);

        // 3. Transferir usando la función correcta
        transfer::public_transfer(combined, winner);
    }


    // === Test Functions ===

}


