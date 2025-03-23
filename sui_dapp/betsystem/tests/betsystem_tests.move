// // #[test_only]
// // #[allow(unused_use)]
// // module betsystem::betsystem_tests {

// //     use sui::test_scenario;
// //     use sui::coin::{Self, Coin};
// //     use sui::sui::SUI;
// //     use betsystem::betsystem;
// //     use std::debug;
// //     use std::vector;

// //      fun mint(addr: address, amount: u64, scenario: &mut test_scenario::Scenario) {
// //         transfer::public_transfer(
// //             coin::mint_for_testing<SUI>(amount, scenario.ctx()),
// //             addr
// //         );
// //         test_scenario::next_tx(scenario, addr);
// //     }


// //    #[test]
// //     fun test_create_game() {

// //         let admin: address = @0x5e27cc7ca78e759e5dcc8377310b8452cdfdd3d84bdd2ce26466645db1ad3df3;
// //         let _player1 =  @0x33;
// //         let _player2 = @0x34;

// //         let message: vector<u8> = b"----------------------------------------------------------------------";
        

// //         Se crea el juego
// //         let mut scenario = test_scenario::begin(admin);
// //         {
// //             let ctx = scenario.ctx();
// //             betsystem::create_game(ctx);
// //         };

// //         scenario.next_tx(admin);
// //         {
// //             let game = test_scenario::take_shared<betsystem::Game>(&mut scenario);

// //             debug::print(&game);

// //             test_scenario::return_shared(game);
// //         };

// //         debug::print(&message);

// //         mint(_player1, 1000000000, &mut scenario);
// //         Jugador 1 se une y apuesta
// //         scenario.next_tx(_player1);
// //         {
// //             let mut game = test_scenario::take_shared<betsystem::Game>(&scenario);
// //             let coin = test_scenario::take_from_sender<Coin<SUI>>(&scenario); // Las funciones que no tengan la habilidad drop, tienen que ser consumidas si o si
// //             betsystem::player_join(&mut game, coin, scenario.ctx()); // Game y Coin es consumida.

// //             debug::print(&game);

// //             test_scenario::return_shared(game);
// //         };

// //         debug::print(&message);

// //         mint(_player2, 1000000000, &mut scenario);
// //         Jugador 2 se une y apuesta
// //         scenario.next_tx(_player2);
// //         {
// //             let mut game = test_scenario::take_shared<betsystem::Game>(&scenario);
// //             let coin = test_scenario::take_from_sender<Coin<SUI>>(&scenario); 
// //             betsystem::player_join(&mut game, coin, scenario.ctx());

// //             debug::print(&game);

// //             test_scenario::return_shared(game);
// //         };

// //         debug::print(&message);

// //         scenario.next_tx(admin);
// //         {
// //             let mut game = test_scenario::take_shared<betsystem::Game>(&scenario);
// //             betsystem::declare_winner(&mut game, @0x0, scenario.ctx());

// //             debug::print(&game);
// //             test_scenario::return_shared(game);
// //         };

// //         scenario.end();
// //     }
// // }