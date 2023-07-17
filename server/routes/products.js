import express from "express";
import validation from "../validation/product.js";
import product from "../data/products.js";
import { ObjectId } from "mongodb";
const router = express.Router();

// create a product
router.route("/createProduct").post(async (req, res) => {
  if (!req.session.user) {
    return res
      .status(400)
      .json({ Error: "You can't create product if you're not logged in" });
  }
  let name = req.body.name;
  let description = req.body.description;
  let category = req.body.category;
  let price = req.body.price;
  let quantity = req.body.quantity;
  let link = req.body.link;

  try {
    name = validation.checkName(name);
    description = validation.checkDescription(description);
    category = validation.checkCategory(category);
    price = validation.checkPrice(price);
    quantity = validation.checkQuantity(quantity);
    link = validation.checkLink(link);
  } catch (e) {
    return res.status(400).json({ Error: e });
  }

  try {
    const newProduct = await product.createProduct(
      name,
      description,
      category,
      price,
      quantity,
      link
    );
    res.status(200).json(newProduct);
  } catch (e) {
    return res.status(400).json({ Error: e });
  }
});

//update a product
router.route("/updateProduct/:id").patch(async (req, res) => {
  if (!req.session.user) {
    return res
      .status(400)
      .json({ Error: "You can't update if you're not logged in" });
  }
  const productId = req.params.id;
  let updateProductResult = undefined;
  let updateFields = {};

  if (req.body.name !== undefined) {
    updateFields.name = req.body.name;
  }
  if (req.body.description !== undefined) {
    updateFields.description = req.body.description;
  }
  if (req.body.category !== undefined) {
    updateFields.category = req.body.category;
  }
  if (req.body.price !== undefined) {
    updateFields.price = req.body.price;
  }
  if (req.body.quantity !== undefined) {
    updateFields.quantity = req.body.quantity;
  }
  if (req.body.link !== undefined) {
    updateFields.link = req.body.link;
  }

  try {
    updateProductResult = await product.updateProduct(productId, updateFields);
  } catch (e) {
    return res.status(400).json({ Error: e });
  }
  if (updateProductResult !== undefined) {
    res.status(200).json(updateProductResult);
  } else {
    res.status(500).json({ Error: "Internal Server Error" });
  }
  return;
});

//list products (get all products)
router.route("/").get(async (req, res) => {});

//get one product by id
router.route("/:id").get(async (req, res) => {
  let id = req.params.id;
  if (!id) {
    res.status(400).json({ error: "You must provide a correct id" });
    return;
  }
  if (typeof id !== "string" || !ObjectId.isValid(id)) {
    res.status(400).json({ error: "You must provide a correct id " });
    return;
  }

  try {
    let productInfo = await product.getProductById(id);
    productInfo._id = productInfo._id.toString();
    res.status(200).json(productInfo);
  } catch (e) {
    return res.status(400).json({ Error: "Can not find the product" });
  }
});

export default router;
