import User from '../../models/User'
import ConnectDB from '../../middleware/mongoose'
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');


const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            console.log(req.body);
            let user = await User.findOne({"email": req.body.email})
            var bytes  = CryptoJS.AES.decrypt(user.password, 'secret123');
            var decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
            console.log(decryptedPass);
            

            if(user){
                if(req.body.email == user.email && req.body.password == decryptedPass){
                    var token = jwt.sign({email: req.body.email, password: req.body.password}, 'secreatfortoken',{
                        expiresIn: '2d'
                    });
                    res.status(200).json({success: true, token, userId: user._id, email: user.email});
                }
                else{
                    res.status(401).json({success: false, error: "invalid Creditantions"})
                }
            }
            res.status(404).json({success: false, error: 'User is not Found'})
           
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error." });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed." });
    }
}

export default ConnectDB(handler);
