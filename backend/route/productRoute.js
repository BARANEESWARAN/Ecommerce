const express = require("express");
const router = express.Router();
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");

router.route("/product").get(getProducts);
router.route("/product/new").post(newProduct);
router.route("/product/:id")
  .get(getSingleProduct)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
