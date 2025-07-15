import Product from '../../models/Product'
import ConnectDB from '../../middleware/mongoose'

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const products = req.body;

      for (let i = 0; i < products.length; i++) {
        let p = new Product({
          title: products[i].title,
          slug: products[i].slug,
          desc: products[i].desc,
          img: products[i].img,
          category: products[i].category,
          size: products[i].size,
          color: products[i].color,
          price: products[i].price,
          avaiableQty: products[i].avaiableQty,
        });
        await p.save();
      }

      // Send response AFTER loop completes
      return res.status(200).json({ message: "Products added successfully." });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error." });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed." });
  }
}

export default ConnectDB(handler);
