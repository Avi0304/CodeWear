import User from '../../models/User'
import ConnectDB from '../../middleware/mongoose'
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
  if(req.method == "POST"){
    let token = req.body.token;
    let user = jwt.verify(token,'secreatfortoken');
    let dbUser = await User.findOne({email: user.email});
    const {Name, email, address, pincode, phone} = dbUser;
    // console.log(dbUser);
    res.status(200).json({Name,email, address, pincode,phone})
  }else{
    res.status(400).json({message: 'Error in fetching the user details.'})
  }
};

export default ConnectDB(handler);
