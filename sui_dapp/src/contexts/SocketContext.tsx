import { createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { UserContext, UserState } from "./UsersContext";


export interface SocketState {
    socket: Socket | null;
    socketIsConnected: boolean | null;
}

export const SocketContext = createContext<SocketState>({
    socket: null,
    socketIsConnected: null,
});

interface UsersProviderProps {
    children: ReactNode;
}

export function SocketProviders({ children }: UsersProviderProps) {

    const socket = useMemo(() => io("http://localhost:7771", { autoConnect: false }), []);

    const [sockState, setSockState] = useState<SocketState>({
        socket: null,
        socketIsConnected: null
    });

    const user = useContext(UserContext);

    const userRef = useRef<UserState>(user);

    useEffect(() => {
        userRef.current = user;
    }, [user]);

    useEffect(() => {

        if (user.walletIsConnected) { // cuando la wallet esta conectada, iniciar conexion con el server
            if (!socket.connected) {
                socket.connect();
            }
            
        } else {
            if (socket.connected) {
                socket.disconnect();
            }
        }

        const onConnect = () => {
            socket.emit("UserAdd", userRef.current);
            setSockState({ socket: socket, socketIsConnected: true });
        };

        const onDisconnect = () => {
            setSockState({ socket: null, socketIsConnected: false });
        };

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);

        return () => {
            socket.off("connect", onConnect);
            socket.off("connect", onDisconnect);
        };

    }, [user.walletIsConnected]);

    return (
        <SocketContext.Provider value={sockState}>
            {children}
        </SocketContext.Provider>
    );
}