import Product from '../../models/Product'
import ConnectDB from '../../middleware/mongoose'

const handler = async (req, res) => {
  let products = await Product.find();

  let tshirts = {};

  for (let item of products) {
    if (item.title in tshirts) {
      if (item.avaiableQty > 0) {
        // Add unique color
        if (!tshirts[item.title].colors.includes(item.color)) {
          tshirts[item.title].colors.push(item.color);
        }
        // Add unique size
        if (!tshirts[item.title].sizes.includes(item.size)) {
          tshirts[item.title].sizes.push(item.size);
        }
      }
    } else {
      // Create new entry
      tshirts[item.title] = {
        _id: item._id,
        title: item.title,
        slug: item.slug,
        desc: item.desc,
        img: item.img,
        category: item.category,
        price: item.price,
        colors: item.avaiableQty > 0 ? [item.color] : [],
        sizes: item.avaiableQty > 0 ? [item.size] : []
      };
    }
  }

  res.status(200).json({ tshirts });
};

export default ConnectDB(handler);
