import { useCurrentWallet } from "@mysten/dapp-kit";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { io, Socket } from "socket.io-client";


const SockContext = createContext<{ isConnected: boolean; sock: Socket | null }>({ isConnected: false, sock: null });

export function SocketProvider({ children }: { children: React.ReactNode }) {

  
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [sock, setSock] = useState<Socket | null>(null);

  const wallet = useCurrentWallet();


  const socket = useMemo(() => 
    io("http://localhost:3333", { autoConnect: false }), 
  []);
  
  useEffect(() => {
    setSock(socket);
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    const handleConnect = () => {
      console.log("Conectado al servidor");
      setIsConnected(true);
    };

    const handleDisconnect = () => {
      console.log("Desconectado del servidor");
      setIsConnected(false);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
    };
  }, [sock]);

  useEffect(() => {
    if (wallet.connectionStatus === "connected") {
      socket.connect();
    } else {
      socket.disconnect();
    }

    return () => {
      socket.disconnect();
    };
  }, [wallet.connectionStatus, sock]);




  return (
    <SockContext.Provider value={{ isConnected, sock }}>
      {children}
    </SockContext.Provider>
  );
}

export const useSocket = () => useContext(SockContext);