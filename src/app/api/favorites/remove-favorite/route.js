import connectMongoDB from "@/database";
import Favorites from "@/models/Favorite";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(request) {
    try {
        await connectMongoDB();
        const {searchParams} = new URL(request.url);
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