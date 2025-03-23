import { Box } from "@radix-ui/themes";
import { SocketContext } from "../contexts/SocketContext";
import { useCallback, useContext, useEffect, useState } from "react";
import { Ex } from "./X";
import {Circle} from "./Circle"

export function Board() {
    const { socket } = useContext(SocketContext);
    const [boardState, setBoardState] = useState<Array<'X' | 'O' | null>>(Array(9).fill(null));
  
    const handleCellClick = useCallback((index: number) => {
      if (socket) {
        socket.emit("cellSelected", index);
      }
    }, [socket]);
  
    useEffect(() => {
      if (!socket) return;
  
      const handleMove = (data: { boardCell: 'X' | 'O', pos: number }) => {
        setBoardState(prev => {
          const newBoard = [...prev];
          newBoard[data.pos] = data.boardCell;
          return newBoard;
        });
      };
  
      socket.on("updatePlayerX", handleMove);
      socket.on("updatePlayerO", handleMove);
  
      return () => {
        socket.off("updatePlayerX", handleMove);
        socket.off("updatePlayerO", handleMove);
      };
    }, [socket]);
  
    return (
      <>
        {boardState.map((cell, index) => (
          <Box
            key={index}
            style={{
              border: "1px solid var(--teal-8)",
              backgroundColor: "var(--teal-5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => handleCellClick(index)}
          >
            {cell === 'X' ? <Ex /> : cell === 'O' ? <Circle /> : null}
          </Box>
        ))}
      </>
    );
  }

