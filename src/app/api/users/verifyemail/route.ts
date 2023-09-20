import connectDB from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {token} = reqBody;
        console.log(token)

        // find the user with the given token and verifiedtokenexpirey 
        const user = await User.findOne({verifiedToken: token,
            verifiedTokenExpire: {$gt: Date.now()}});
        if(!user){
            return NextResponse.json({error: "Invalid token"}, {status: 400});
        }
        user.isVerified = true;
        user.verifiedToken = undefined;
        user.verifiedTokenExpire = undefined;
        await user.save();

        return NextResponse.json({message: "Email verified successfully", success: true})
        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
        
    }
}