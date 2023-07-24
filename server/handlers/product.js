const db = require("../models");

//POST - /users/:id/products
exports.createProduct = async function (req, res, next) {
  console.log(req.params.id);
  try {
    // create a product
    const product = await db.Product.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
      link: req.body.link,
      user: req.params.id,
    });
    //find the user
    console.log(req.params.id);
    const user = await db.User.findById(req.params.id);
    //push the created product into user's product list
    await user.products.push(product.id);
    await user.save();
    console.log(product._id);
    const returnProduct = await db.Product.findById(product._id).populate(
      "user",
      {
        email: true,
      }
    );
    return res.status(200).json(returnProduct);
  } catch (err) {
    return next(err);
  }
};

//PATCH - /users/:user_id/products/:product_id
exports.updateProduct = async function (req, res, next) {
  try {
    const product = await db.Product.findById(req.params.product_id);
    if (product) {
      product.name = req.body.name || product.name;
      product.description = req.body.description || product.description;
      product.category = req.body.category || product.category;
      product.price = req.body.price || product.price;
      product.quantity = req.body.quantity || product.quantity;
      product.link = req.body.link || product.link;

      const updatedProduct = await product.save();
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  } catch (err) {
    return next(err);
  }
};

// GET - /users/:id/products
exports.getAllProducts = async function (req, res, next) {
  try {
    const user = await db.User.findById(req.params.id);
    return res.status(200).json({ products: user.products });
  } catch (err) {
    return next(err);
  }
};

// GET - /users/:id/products/:product_id
exports.getProduct = async function (req, res, next) {
  console.log(req.params.id);
  console.log(req.params.product_id);
  try {
    const product = await db.Product.findById(req.params.product_id);
    return res.status(200).json({ product });
  } catch (err) {
    return next(err);
  }
};
