import { Container, DataList } from "@radix-ui/themes";
import { actualNode } from "../utils/suiconfig";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { useEffect, useState } from "react";
import { MIST_PER_SUI } from '@mysten/sui/utils';
import { useSocket } from "../utils/socket";


export function Info() {

    const { isConnected } = useSocket();

    const suiClient = new SuiClient({ url: getFullnodeUrl(actualNode) });
    const suiAccount = useCurrentAccount();

    const address = suiAccount?.address;
    const [balance, setBalance] = useState<number | null | string>(null);
    const [coinType, setCoinType] = useState<string | null>(null);

    useEffect(() => {
        if (address) {
            suiClient.getBalance({ owner: address }).then((balance) => {
                setBalance((Number(balance.totalBalance) / Number(MIST_PER_SUI)));
                setCoinType(balance.coinType);
            });
        }
    }, [balance, address, coinType]);

    return (

        <Container m={"9"}>
            <DataList.Root size={"3"} orientation={"vertical"}>
                <DataList.Item align={"center"}>

                    <DataList.Label color="teal">Wallet Address</DataList.Label>
                    <DataList.Value>{address}</DataList.Value>
                    <DataList.Label color="teal">Balance</DataList.Label>
                    <DataList.Value>{balance && coinType !== null ? balance + " " + coinType : ""}</DataList.Value>
                    <DataList.Label color="teal">Server Status</DataList.Label>
                    <DataList.Value>{isConnected == true ? "Connected" : ""}</DataList.Value>
                    <DataList.Label color="teal">Users Connected</DataList.Label>
                    <DataList.Value>{}</DataList.Value>
                </DataList.Item>
            </DataList.Root>
        </Container>

    );
}