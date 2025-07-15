import User from '../../models/User'
import ConnectDB from '../../middleware/mongoose'
var jwt = require('jsonwebtoken');
import CryptoJS from 'crypto-js';

const handler = async (req, res) => {
    if (req.method === "PUT") {
        try {
            const { token, oldpassword, newPassword } = req.body;

            if (!token) {
                return res.status(401).json({ success: false, message: "Token is required" });
            }

            const userData = jwt.verify(token, 'secreatfortoken');

            let dbUser = await User.findOne({ email: userData.email });

            if (!dbUser) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            const bytes = CryptoJS.AES.decrypt(dbUser.password, 'secret123');
            const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

            // Compare old password
            if (oldpassword !== decryptedPassword) {
                return res.status(401).json({ success: false, message: "Incorrect old password." });
            }

            const encryptedNewPassword = CryptoJS.AES.encrypt(newPassword, 'secret123').toString();
            dbUser.password = encryptedNewPassword;

            await dbUser.save();

            res.status(200).json({ success: true, message: "Password updated successfully" });
        } catch (err) {
            console.error("Update Error:", err.message);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
};

export default ConnectDB(handler);
