import { getDataFromToken } from "@/helpers/getTokenData";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import connectDB from "@/dbconfig/dbconfig";

connectDB();

export async function GET(request: NextRequest){
    try {
        const userId = getDataFromToken(request)
        const user = await User.findOne({_id: userId}).select("-password");

        return NextResponse.json({message: 'User Found', data: user})
        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400})
    }
}