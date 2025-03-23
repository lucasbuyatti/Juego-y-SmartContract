import { Socket } from "socket.io";

export const users = new Set<string>();

export function createUsers(id: string) {
    return id;
}

export function addUserToList(socketId: string) {
    users.add(createUsers(socketId));
}

export function removeUserFromList(socketId: string) {
    users.forEach((user) => {
        if (socketId == user) {
            users.delete(user);
        }
    });
}


