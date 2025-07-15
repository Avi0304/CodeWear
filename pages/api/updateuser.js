import User from '../../models/User'
import ConnectDB from '../../middleware/mongoose'
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
  if (req.method === "PUT") {
    try {
      const { token, name, address, phone, city, state, pincode } = req.body;

      if (!token) {
        return res.status(401).json({ success: false, message: "Token is required" });
      }

      const userData = jwt.verify(token, 'secreatfortoken');

      let dbUser = await User.findOne({ email: userData.email });

      if (!dbUser) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      dbUser.Name = name || dbUser.Name;
      dbUser.address = address || dbUser.address;
      dbUser.phone = phone || dbUser.phone;
      dbUser.city = city || dbUser.city;
      dbUser.state = state || dbUser.state;
      dbUser.pincode = pincode || dbUser.pincode;

      await dbUser.save();

      res.status(200).json({ success: true, message: "User updated successfully" });
    } catch (err) {
      console.error("Update Error:", err.message);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
};

export default ConnectDB(handler);
