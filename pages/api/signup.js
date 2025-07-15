import User from '../../models/User'
import ConnectDB from '../../middleware/mongoose'
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            console.log(req.body);

            const {Name, email} = req.body;
            console.log(req.body.password);
            
            const u = new User({Name, email, password: CryptoJS.AES.encrypt(req.body.password, 'secret123').toString()})
            await u.save();
            res.status(200).json({ message: "User added successfully." });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error." });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed." });
    }
}

export default ConnectDB(handler);
