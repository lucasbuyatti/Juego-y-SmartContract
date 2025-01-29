
interface Users {
    address: string;
    balance: number | null | string;
    coinType: string | null;
    table: number[];
    isPlaying: boolean;
    isWinner: boolean;
    isTurn: boolean;
};

const users = new Set<Users>();

function createUsers(address: string, balance: number | null | string, coinType: string | null, table: number[], isPlaying: boolean, isWinner: boolean, isTurn: boolean): Users {
    return { address, balance, coinType, table, isPlaying, isWinner, isTurn };
}

function addUserToList(address: string, balance: number | null | string, coinType: string | null): void {
    users.add(createUsers(address, balance, coinType, [0,0,0,0,0,0,0,0,0], false, false, false));
}

function removeUserFromList(address: string): void {
    users.forEach((user) => {
        if (user.address === address) {
            users.delete(user);
        }
    });
}

type Game = {
    id: string;
    winner: string;
    players: Users[];
    table: string[];
};

