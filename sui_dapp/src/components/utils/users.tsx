import { createContext, ReactNode, useEffect, useState } from "react";

interface Users {
    address: string;
    balance: number | null | string;
    coinType: string | null;
    table: number[];
    isPlaying: boolean;
    isWinner: boolean;
    isTurn: boolean;
};

const UserContext = createContext
<{user: Users | undefined}>
({user: undefined});


export function UsersProvider({ children }: { children: ReactNode }) {


    const [user, setUser] = useState<Users | undefined>(undefined);

    useEffect(() => {
        return;
    }, []);

    return (
        <UserContext.Provider value={{user}}>
            {children}
        </UserContext.Provider>
    );
}