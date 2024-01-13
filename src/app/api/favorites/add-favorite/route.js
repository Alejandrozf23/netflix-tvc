import connectMongoDB from "@/database";
import Favorites from "@/models/Favorite";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request) {
    try {
        await connectMongoDB();
        const data = await request.json();
        const isFavoriteAlreadyExists = await Favorites.find({ 
            uid: data.uid, 
            movieID: data.movieID, 
            accountID: data.accountID });

        if (isFavoriteAlreadyExists && isFavoriteAlreadyExists.length > 0) {
            return NextResponse.json({
                succes: false,
                message: "This is already added to your list!",
            });
        }

        const newlyCreatedFavorite = await Favorites.create(data);

        if (newlyCreatedFavorite) {
            return NextResponse.json({
                succes: true,
                message: "Added to your list successfully!",
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