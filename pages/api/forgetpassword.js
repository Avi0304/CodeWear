import Forget from "../../models/Forget";
import User from "../../models/User"
import ConnectDB from '../../middleware/mongoose'
import nodemailer from 'nodemailer'
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    const { token, email, sendEmail } = req.body;

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    if (sendEmail === true) {
        try {
            // Save forget record

            const existing = await Forget.findOne({ email });
            if (!existing) {
                const forget = new Forget({ token, email });
                await forget.save();
            }

            await Forget.findOneAndUpdate(
                { email },
                { token },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );

            // Email transporter
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.NEXT_PUBLIC_GMAIL_USER,
                    pass: process.env.NEXT_PUBLIC_GMAIL_PASS,
                },
            });

            // Email body
            let htmlBody = `
  <div style="background-color:#ec4899; padding: 30px; border-radius: 10px; color: white; font-family: Arial, sans-serif;">
    <h2 style="margin-top: 0; font-size: 24px;">Reset Your Password</h2>

    <p>Hello,</p>
    <p>We received a request to reset the password associated with this email.</p>

    <p style="margin: 20px 0; text-align: center;">
      <a href="http://localhost:3000/forget?token=${token}"
         style="background-color: white; color: #ec4899; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 5px; display: inline-block;">
         Reset Password
      </a>
    </p>

    <p>If you didn’t request this, please ignore this email. Your password will remain unchanged.</p>

    <p style="margin-top: 30px;">Stay secure,<br/>The <strong>CodeWear</strong> Team</p>
  </div>
`;


            // Send email
            await transporter.sendMail({
                from: `"CodeWear Support" <${process.env.NEXT_PUBLIC_GMAIL_USER}>`,
                to: email,
                subject: "Reset Your Password - CodeWear.com",
                html: htmlBody
            });

            return res.status(200).json({ success: true, message: 'Reset email sent successfully' });
        } catch (error) {
            console.error("Error sending reset email:", error);
            return res.status(500).json({ success: false, message: 'Failed to send email' });
        }
    } else {
        // reset password 
        try {
            const { token, npassword, cpassword } = req.body;

            if (npassword !== cpassword) {
                return res.status(400).json({ success: false, message: "Password do not match" });
            }

            const forgetRecord = await Forget.findOne({ token });
            if (!forgetRecord) {
                return res.status(400).json({ sucess: false, message: "Record not found.." });
            }

            const hashedPassword = CryptoJS.AES.encrypt(npassword, 'secret123').toString();
            await User.findOneAndUpdate(
                { email: forgetRecord.email },
                { password: hashedPassword }
            );
            await Forget.deleteOne({ token });

            return res.status(200).json({ sucess: true, message: "Reset Password Sucessfully" });
        } catch (error) {
            console.error("error in reseting password: ", error);
            return res.status(200).json({ sucess: false, message: "Reset Password Error" });
        }
    }
}

export default ConnectDB(handler);
