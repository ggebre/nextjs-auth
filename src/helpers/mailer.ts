import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';


export const sendEmail = async({email, emailType, userId}: any) => {
    try {
        // create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        if(emailType === 'VERIFY'){
            await User.findByIdAndUpdate(userId,{
                verifiedToken: hashedToken, verifiedTokenExpire: Date.now() + 3600000
            })
        } else if (emailType === 'RESET'){
            await User.findByIdAndUpdate(userId,{
                forgotPasswordToken: hashedToken, forgotPasswordTokenExpire: Date.now() + 3600000
            })
        }
        // get this from mailtrap.io smtp for sending mail 
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.NODEMAILER_USER,
              pass: process.env.NODEMAILER_PASSWORD
            }
          });
          const href = `${process.env.DOMAIN}/${emailType === 'VERIFY' ? "verifyemail" : "resetpassword"}?token=${hashedToken}`

          const mailOptions = {
            from: 'getu@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href=${href}>here</a> to ${emailType === "VERIFY" ? "Verify your email" : "reset your password"} or copy and paste the link below in your browser. <br> ${href}</p>`
          }
          const mailResponse = await transport.sendMail(mailOptions)

          return mailResponse
    } catch (error: any) {
        throw new Error(error.message)
    }
}
