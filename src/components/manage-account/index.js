'use client'

import { GlobalContext } from "@/context"
import { useSession } from "next-auth/react";
import { useContext } from "react"

export default function ManageAccounts() {

    const { account, setAccounts } = useContext(GlobalContext);

    const { data: session } = useSession();

    async function getAllAccounts() {
        const response = await fetch(
            `/api/account/get-all-accounts?id=${session?.user?.uid}`,
            {method: "GET"}
        );

        const data = await response.json();
        
        return data;
    }

    return <div className="min-h-screen flex justify-center flex-col items-center relative">
        <div className="flex justify-center flex-col items-center">
            <h1 className="text-white font-bold text-[54px] my-[36px]">
                Who's Watching?
            </h1>
            <ul>
                
            </ul>
        </div>        
    </div>
}