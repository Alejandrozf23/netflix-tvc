'use client'

import ManageAccounts from "@/components/manage-account"
import UnauthPage from "@/components/unauth-page";
import CommonLayout from "@/components/common-layout";
import { GlobalContext } from "@/context";
import { useSession } from "next-auth/react"
import { useContext } from "react";

export default function Browse() {

    const { loggedInAccount } = useContext(GlobalContext);

    const { data: session } = useSession();

    if (session === null) return <UnauthPage/>
    
    if (loggedInAccount === null) return <ManageAccounts/>

    return <main className="flex min-h-screen flex-col">
        <CommonLayout/>
    </main>
}