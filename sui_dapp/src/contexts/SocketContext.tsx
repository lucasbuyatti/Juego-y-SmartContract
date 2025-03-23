import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { io, Socket } from "socket.io-client";
import { UserContext, } from "./UsersContext";


export interface SocketState {
    socket: Socket | null;
}

export const SocketContext = createContext<SocketState>({
    socket: null,
});

interface UsersProviderProps {
    children: ReactNode;
}

export function SocketProviders({ children }: UsersProviderProps) {

    const socket = useMemo(() => io("http://localhost:7771", { autoConnect: false }), []);

    const [sock, setSockState] = useState<SocketState>({
        socket: null,
    });

    const user = useContext(UserContext);

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
            socket.emit("UserAdd", socket.id);
            setSockState({ socket: socket});
        };

    

        const onDisconnect = () => {
            setSockState({ socket: null});
        };

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
        };

    }, [user.walletIsConnected]);

    return (
        <SocketContext.Provider value={sock}>
            {children}
        </SocketContext.Provider>
    );
}