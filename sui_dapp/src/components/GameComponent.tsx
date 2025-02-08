import { Container, Flex, Grid, Button } from "@radix-ui/themes";
import { useContext } from "react";
import { Board } from "./Board";
import { UserContext } from "../contexts/UsersContext";
import { estatus, GameContext } from "../contexts/GameContext";
import { SocketContext } from "../contexts/SocketContext";

export function GameComponent() {

    const user = useContext(UserContext);
    const gameContext = useContext(GameContext);
    const socket = useContext(SocketContext);

    if (socket.socket) {
        if (gameContext?.status == "inqueue") {
            socket.socket.emit("joinGame");
        }

        socket.socket.on("ingame", () => {
            gameContext?.setStatus(estatus.ingame);
            console.log("Estoy en juego");
        })
    }
   
   
    
    

    return (

        <Container mt={"4"} mb={"9"}>
            <Container m={"3"} mb={"6"}>
                <Flex align={"center"} justify={"center"} gap={"2"}>
                    {user.walletIsConnected ? gameContext?.status == "ingame" ? null : <Button style={{ color: "var(--teal-12)", backgroundColor: "var(--teal-5)" }} size={"2"} onClick={gameContext?.toggleStatus}>{gameContext?.status == "idle" ? "play" : "inqueue"}</Button> : null}
                </Flex>
            </Container>
            <Grid columns="repeat(3, 8rem)" rows="repeat(3, minmax(8rem, auto))" gap="2" width="auto" justify={"center"} >
                <Board></Board>
            </Grid>
        </Container>
    );
}