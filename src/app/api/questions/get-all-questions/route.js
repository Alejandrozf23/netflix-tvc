import createConnectionMongo from "@/database";
import { NextResponse } from "next/server";
import Question from "@/models/Question";

export const dynamic = "force-dynamic";

export async function GET(request) {
    try {
        const {searchParams} = new URL(request.url);
        const origin = searchParams.get('origin');
        await createConnectionMongo(origin);
        const getAllQuestions = await Question.find();
        
        if (getAllQuestions) {
            return NextResponse.json({
                success: true,
                data: getAllQuestions,
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