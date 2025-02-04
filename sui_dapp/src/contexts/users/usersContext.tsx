import { useCurrentAccount, useCurrentWallet } from "@mysten/dapp-kit";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { createContext, ReactNode, useEffect, useState } from "react";
import { MIST_PER_SUI } from '@mysten/sui/utils';

export interface UserState {
    address: string | null;
    coinBalance: number | null;
    coinType: string | null;
    walletIsConnected: boolean | null;
}

export const UserContext = createContext<UserState>({
    
        address: null,
        coinBalance: null,
        coinType: null,
        walletIsConnected: null
    
});


interface UsersProviderProps {
    children: ReactNode;
}

export function UsersProvider({ children }: UsersProviderProps) {
    const account = useCurrentAccount();
    const wallet = useCurrentWallet();
    const [user, setUser] = useState<UserState>({
        address: null,
        coinBalance: null,
        coinType: null,
        walletIsConnected: null
    });

    const suiCLI = new SuiClient({ url: getFullnodeUrl("testnet") });

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (account && wallet.isConnected) {
                    const coin = await suiCLI.getBalance({ owner: account.address });
                    setUser({
                        address: account.address,
                        coinBalance: Number(coin.totalBalance) / Number(MIST_PER_SUI),
                        coinType: coin.coinType,
                        walletIsConnected: wallet.isConnected
                    });
                } else {
                    setUser({
                        address: null,
                        coinBalance: null,
                        coinType: null,
                        walletIsConnected: false
                    });
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } 
        };

        fetchData();
    }, [account, wallet.isConnected]);

    return (
        <UserContext.Provider value={ user }>
            {children}
        </UserContext.Provider>
    );
}