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
router.get("/", loginRequired, getAllProducts);
router.get("/:product_id", loginRequired, ensureCorrectUser, getProduct);
router.post("/", loginRequired, createProduct);
router.patch("/:product_id", loginRequired, ensureCorrectUser, updateProduct);

module.exports = router;
