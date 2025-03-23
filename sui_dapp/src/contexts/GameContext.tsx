import { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

// Definir los posibles estados del juego
export enum estatus {
  idle = "idle",
  inqueue = "inqueue",
  ingame = "ingame",
}

export const GameContext = createContext<{
  status: estatus;
  setStatus: Dispatch<SetStateAction<estatus>>
} | null>(null);


export function GameProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<estatus>(estatus.idle);

  return (
    <GameContext.Provider value={{ status, setStatus }}>
      {children}
    </GameContext.Provider>
  );
}