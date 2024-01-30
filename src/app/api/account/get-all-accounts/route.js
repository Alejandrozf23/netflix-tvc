import createConnectionMongo from "@/database";
import Account from "@/models/Account";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request) {
    try {
        const {searchParams} = new URL(request.url);
        const origin = searchParams.get('origin');
        await createConnectionMongo(origin);
        const id = searchParams.get('id');
        const query = { uid: id };
        const getAllAccounts = await Account.find(query);
        
        if (getAllAccounts) {
            return NextResponse.json({
                success: true,
                data: getAllAccounts,
            })
        } else {
            return NextResponse.json({
                success: false,
                message: "Something went wrong!",
            });
        }

    } catch (e) {
        console.log(e);
        return NextResponse.json({
            success: false,
            message: "Something went wrong!",
        });
    }
}