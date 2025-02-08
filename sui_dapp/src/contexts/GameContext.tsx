import { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

// Definir los posibles estados del juego
export enum estatus {
  idle = "idle",
  inqueue = "inqueue",
  ingame = "ingame",
}

export const GameContext = createContext<{
  status: estatus;
  toggleStatus: () => void;
  setStatus: Dispatch<SetStateAction<estatus>>
} | null>(null);


export function GameProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<estatus>(estatus.idle);

  const toggleStatus = () => {
    setStatus((prevStatus) =>
      prevStatus === estatus.idle ? estatus.inqueue : estatus.idle
    );
  };

  return (
    <GameContext.Provider value={{ status, toggleStatus, setStatus }}>
      {children}
    </GameContext.Provider>
  );
}