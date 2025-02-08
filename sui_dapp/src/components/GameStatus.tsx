import { useState } from "react";

export interface Game {
    status: "idle" | "inqueue";
    table: string[];
}

export const UseGameStatus = () => {
    const [game, setGame] = useState<Game>({
        status: "idle",
        table: []
    });

    const changeStatusToInQueue = () => {
        setGame(prevGame => ({
            ...prevGame,
            status: "inqueue"
        }));
    };

    return {
        game,
        changeStatusToInQueue
    };
};