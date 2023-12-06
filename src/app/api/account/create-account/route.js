import connectMongoDB from "@/database";
import Account from "@/models/Account";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request) {
    try {
        await connectMongoDB();
        const {name, pin, uid} = await request.json();
        const isAccountAlreadyExists = await Account.find({uid, name});
        const allAccounts = await Account.find({});

        if (isAccountAlreadyExists) {
            return NextResponse.json({
                succes: false,
                message: "Please try with a different name!",
            });
        }

        if (allAccounts && allAccounts.length === 4) {
            return NextResponse.json({
                succes: false,
                message: "You can only add max 4 accounts!",
            });
        }

        const hashPin = await hash(pin, 12);
        const newlyCreatedAccount = await Account.create({
            name, pin: hashPin, uid,
        });

        if (newlyCreatedAccount) {
            return NextResponse.json({
                succes: true,
                message: "Account created successfully!",
            });
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