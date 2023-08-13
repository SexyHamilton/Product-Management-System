const express = require("express");
const router = express.Router();
const {
  createProduct,
  updateProduct,
  getAllProducts,
  getProduct,
  addProductToCart,
  getProductsFromCart,
  dropProductFromCart,
  deleteProductFromCart,
} = require("../handlers/product");
const { loginRequired, ensureCorrectUser } = require("../middleware/auth");

//
router.get("/:id/products", getAllProducts);
router.get("/products/:product_id", getProduct);
router.post("/:id/products", loginRequired, createProduct);
router.patch(
  "/:id/products/:product_id",
  loginRequired,
  ensureCorrectUser,
  updateProduct
);
router.post(
  "/:id/add/:productId",
  loginRequired,
  ensureCorrectUser,
  addProductToCart
);

router.post(
  "/:id/drop/:productId",
  loginRequired,
  ensureCorrectUser,
  dropProductFromCart
);
router.get("/:id/cart", loginRequired, ensureCorrectUser, getProductsFromCart);

router.post(
  "/:id/cartDelete/:productId",
  loginRequired,
  ensureCorrectUser,
  deleteProductFromCart
);

module.exports = router;
