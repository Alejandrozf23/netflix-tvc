import createConnectionMongo from "@/database";
import Favorites from "@/models/Favorite";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request) {
    try {
        const {searchParams} = new URL(request.url);
        const origin = searchParams.get('origin');
        await createConnectionMongo(origin);

        const id = searchParams.get('id');
        const accountID = searchParams.get('accountID');
        const getAllFavorites = await Favorites.find({ uid: id, accountID });
        
        if (getAllFavorites) {
            return NextResponse.json({
                success: true,
                data: getAllFavorites,
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