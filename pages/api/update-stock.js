import ConnectDB from "../../middleware/mongoose";
import Product from "../../models/Product";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { cart } = req.body;

    try {
      for (let slug in cart) {
        const item = cart[slug];
        console.log("🔄 Updating product:", slug);

        const updatedProduct = await Product.findOneAndUpdate(
          { slug },
          { $inc: { avaiableQty: -item.qty } },
          { new: true }
        );

        if (!updatedProduct) {
          console.warn("⚠️ Product not found for slug:", slug);
          continue;
        }

        const qty = updatedProduct.avaiableQty;
        let status = "active";

        if (qty <= 0) {
          status = "out of stock";
        } else if (qty <= 20) {
          status = "low stock";
        }

        console.log(`✅ Qty: ${qty}, Setting status: ${status}`);

        const statusUpdateResult = await Product.updateOne(
          { slug },
          { $set: { status } }
        );

        console.log("📦 Status update result:", statusUpdateResult);
      }

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("❌ Error updating stock:", error);
      return res.status(500).json({ error: "Stock Update Failed" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default ConnectDB(handler);
