import { Container, DataList } from "@radix-ui/themes";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UsersContext";
import { SocketContext } from "../contexts/SocketContext";




export function DataListComponent() {

    const user = useContext(UserContext);
    const sock = useContext(SocketContext);

    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        if (sock.socket) {
            const handleTotalUsers = (totalUsers: number) => {
                setTotal(totalUsers);
            };

            sock.socket.on("TotalUsers", handleTotalUsers);

            return () => {
                if (sock.socket) { sock.socket.off("TotalUsers", handleTotalUsers); }
            };
        }
    }, [sock.socket]);


    if (user.walletIsConnected && sock.socket?.connected) {
        return (
            <Container m={"9"}>
                <DataList.Root size={"3"} orientation={"vertical"}>
                    <DataList.Item align={"center"}>
                        <DataList.Label color="teal">Wallet Address</DataList.Label>
                        <DataList.Value>{user.address}</DataList.Value>
                        <DataList.Label color="teal">Balance</DataList.Label>
                        <DataList.Value>{user.coinBalance} {user.coinType}</DataList.Value>
                        <DataList.Label color="teal">Server Status</DataList.Label>
                        <DataList.Value>{sock.socket?.connected ? "Connected" : "Not Connected"}</DataList.Value>
                        <DataList.Label color="teal">Users Connected</DataList.Label>
                        <DataList.Value>{total}</DataList.Value>
                    </DataList.Item>
                </DataList.Root>
            </Container>
        );
    }
}