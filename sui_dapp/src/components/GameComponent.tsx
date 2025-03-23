import { Container, Flex, Grid, Button } from "@radix-ui/themes";
import { useContext, useEffect, useState } from "react";
import { Board } from "./Board";
import { UserContext } from "../contexts/UsersContext";
import { estatus, GameContext } from "../contexts/GameContext";
import { SocketContext } from "../contexts/SocketContext";

export function GameComponent() {

    const user = useContext(UserContext);
    const gameContext = useContext(GameContext);
    const { socket } = useContext(SocketContext);

    if (!socket || !gameContext) return;

    const changeStatus = () => {
        if (!socket || !gameContext) return;

        const newStatus = gameContext.status === estatus.idle
            ? estatus.inqueue
            : estatus.idle;

        gameContext.setStatus(newStatus);

        if (newStatus === estatus.inqueue) {
            socket.emit("joinqueue", user.address);
        } else {
            socket.emit("leavequeue");
        }
    };

    useEffect(() => {
        const handleIngame = () => {
            gameContext.setStatus(estatus.ingame);
        };

        const handleWinner = (data: boolean) => {
            if (data) {
                console.log("You win");
                gameContext.setStatus(estatus.idle);
            } else {
                gameContext.setStatus(estatus.idle);
                console.log("You lose");
            }
        };

        if (socket) {
            socket.on("ingame", handleIngame);
            socket.on("winner",  handleWinner);
        }

        return () => {
            socket?.off("ingame", handleIngame);
            socket?.off("winner", handleWinner);
        };
    }, [socket]);



    

    return (
        <Container mt={"4"} mb={"9"}>
            <Container m={"3"} mb={"6"}>
                <Flex align={"center"} justify={"center"} gap={"2"}>
                    {user.walletIsConnected && gameContext.status !== estatus.ingame && (
                        <Button
                            style={{ color: "var(--teal-12)", backgroundColor: "var(--teal-5)" }}
                            size="2"
                            onClick={changeStatus}
                        >
                            {gameContext.status === estatus.idle ? "Play" : "InQueue"}
                        </Button>
                    )}
                </Flex>
            </Container>
            <Grid columns="repeat(3, 8rem)" rows="repeat(3, minmax(8rem, auto))" gap="2" width="auto" justify={"center"} >
                <Board></Board>
            </Grid>
        </Container>
    );
}