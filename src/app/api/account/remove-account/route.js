import createConnectionMongo from "@/database";
import Account from "@/models/Account";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(request) {
    try {
        const {searchParams} = new URL(request.url);
        const origin = searchParams.get('origin');        
        const id = searchParams.get('id');
        await createConnectionMongo(origin);

        if (!id) {
            return NextResponse.json({
                success: false,
                message: "Account ID is mandatory!",
            });
        }

        const deleteAccount = await Account.findByIdAndDelete(id);
        if (deleteAccount) {
            return NextResponse.json({
                success: true,
                message: "Account deleted successfully!",
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Something wnet wrong!",
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