import Product from '../../models/Product'
import ConnectDB from '../../middleware/mongoose'

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const products = req.body;  

      for (let i = 0; i < products.length; i++) {
        let p = await Product.findByIdAndUpdate(req.body[i]._id,req.body[i], {new: true})  
      }

      return res.status(200).json({ message: "Products has been updated successfully..." });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error." });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed." });
  }
}

export default ConnectDB(handler);
