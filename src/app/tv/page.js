'use client'

import UnauthPage from "@/components/unauth-page";
import { useSession } from "next-auth/react"

export default function TV() {

    const { data: session } = useSession();

    if (session === null) return <UnauthPage/>

    return <div>TV</div>
}