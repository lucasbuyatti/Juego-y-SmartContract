import { Socket } from "socket.io";

export interface Player {
    socketId: string;
    usrState: UserState;
}

export interface UserState {
    address: string | null;
    coinBalance: number | null;
    coinType: string | null;
    walletIsConnected: boolean | null;
}

export const users = new Set<Player>();

export function createUsers(data: Player) {
    return {
        socketId: data.socketId as string,
        usrState: {
            address: data.usrState.address,
            coinBalance: data.usrState.coinBalance,
            coinType: data.usrState.coinType,
            walletIsConnected: data.usrState.walletIsConnected
        } as UserState
    };
}

export function addUserToList(user: Player) {
    users.add(createUsers({
        socketId: user.socketId as string,
        usrState: {
            address: user.usrState.address,
            coinBalance: user.usrState.coinBalance,
            coinType: user.usrState.coinType,
            walletIsConnected: user.usrState.walletIsConnected
        } as UserState
    }));
}

export function removeUserFromList(socketId: string) {
    users.forEach((user) => {
        if (socketId == user.socketId) {
            users.delete(user);
        }
    });
}

type Game = {
    id: string;
    winner: string;
    players: Set<Player>;
    table: string[];
};

