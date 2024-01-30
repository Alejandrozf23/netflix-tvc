import createConnectionMongo from "@/database";
import Favorites from "@/models/Favorite";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(request) {
    try {
        const {searchParams} = new URL(request.url);
        const origin = searchParams.get('origin');
        await createConnectionMongo(origin);
        
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({
                success: false,
                message: "Favorite item ID is required!",
            });
        }

        const deleteFavoriteItem = await Favorites.findByIdAndDelete(id);
        if (deleteFavoriteItem) {
            return NextResponse.json({
                success: true,
                message: "Removed from your list!",
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