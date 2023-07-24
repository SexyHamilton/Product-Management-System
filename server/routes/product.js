const express = require("express");
const router = express.Router();
const {
  createProduct,
  updateProduct,
  getAllProducts,
  getProduct,
} = require("../handlers/product");
const { loginRequired, ensureCorrectUser } = require("../middleware/auth");

//
router.get("/:id/products", loginRequired, getAllProducts);
router.get(
  "/:id/products/:product_id",
  loginRequired,
  ensureCorrectUser,
  getProduct
);
router.post("/:id/products", loginRequired, createProduct);
router.patch(
  "/:id/products/:product_id",
  loginRequired,
  ensureCorrectUser,
  updateProduct
);

module.exports = router;
