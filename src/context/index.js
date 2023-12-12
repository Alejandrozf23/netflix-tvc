'use client'

import CircleLoader from "@/components/circle-loader";
import { useSession } from 'next-auth/react';
import { createContext, useState } from 'react';

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {

    const [loggedInAccount, setLoggedInAccount] = useState(null);
    const [accounts, setAccounts] = useState([]);

    const {data: session} = useSession();

    if (session === undefined) return <CircleLoader/>

    return (
        <GlobalContext.Provider value={{loggedInAccount, setLoggedInAccount, accounts, setAccounts}}>
            {children}
        </GlobalContext.Provider>
    )
}