const router = require("express").Router();
const Product = require("../models/Product");

// auto barcode generator
const generateBarcode = () => "BC" + Date.now();

// add product
router.post("/add", async (req, res) => {
  const { name, price, barcode } = req.body;

  const product = new Product({
    name,
    price,
    barcode: barcode || generateBarcode()
  });

  await product.save();
  res.json(product);
});

// get product by barcode (billing)
router.get("/:barcode", async (req, res) => {
  const product = await Product.findOne({
    barcode: req.params.barcode
  });

  if (!product)
    return res.status(404).json({ message: "Not found" });

  res.json(product);
});

module.exports = router;
