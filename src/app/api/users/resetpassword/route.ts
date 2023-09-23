import connectDB from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";
var bcryptjs = require('bcryptjs');
connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password, token} = reqBody;

        if(password && token) {
                // find the user with the given token and verifiedtokenexpirey 
            const user = await User.findOne({forgotPasswordToken: token,
                forgotPasswordTokenExpire: {$gt: Date.now()}});
            if(!user){
                return NextResponse.json({error: "Invalid token"}, {status: 400});
            }
            // hash password 
            const salt = await bcryptjs.genSalt(10)
            
            const hashedPassword = await bcryptjs.hash(password, salt);


            user.password = hashedPassword
            user.forgotPasswordToken = undefined;
            user.forgotPasswordTokenExpire = undefined;
            await user.save();

            return NextResponse.json({message: "Password Changed Successfully", success: true})
        }
        //find the user with the given username and email 
        const user = await User.findOne({ username, email});
        if(!user){
            return NextResponse.json({error: "Invalid username or email"}, {status: 400});
        }
        // send verification email to sender with a link to update password 
        await sendEmail({email, emailType: "RESET", userId: user._id})
        

        return NextResponse.json({message: "Password Reset instruction sent", success: true})
        
            
    } catch (error: any) {
        
    }
    

    
}