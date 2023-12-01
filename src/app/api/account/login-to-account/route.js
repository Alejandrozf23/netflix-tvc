import connectMongoDB from "@/database";
import Account from "@/models/Account";
import { compare } from "bcryptjs";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request) {
    try {
        await connectMongoDB();

        const {pin, accountId, uid} = await request.json();

        const getCurrentAccount = await Account.findOne({_id: accountId, uid});

        if (!getCurrentAccount) {
            return NextResponse.json({
                success: false,
                message: "Account not found!",
            });
        }

        const checkPin = await compare(pin, getCurrentAccount.pin);

        if (checkPin) {
            return NextResponse.json({
                success: true,
                message: "Welcome to Netflix!",
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Incorrect PIN! Please try again",
            });
        }
    } catch (e) {
        console.log(e);
        return NextResponse.json({
            success: false,
            message: "Something wnet wrong!",
        });
    }
}