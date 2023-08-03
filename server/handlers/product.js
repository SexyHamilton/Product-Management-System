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
    console.log(product);
    const user = await db.User.findById(req.params.id);
    //push the created product into user's product list
    await user.products.push(product.id);
    await user.save();
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

const counterForProductIds = (arr) => {
  if (arr.length === 0) {
    return;
  }
  let result = [];
  let idList = [];
  for (let i = 0; i < arr.length; i++) {
    let id = arr[i]._id.toString();
    if (!idList.includes(id)) {
      let obj = {
        id: id,
        link: arr[i].link,
        name: arr[i].name,
        price: arr[i].price,
        stockQuantity: arr[i].quantity,
        quantity: 1,
      };
      idList.push(id);
      result.push(obj);
    } else {
      for (let j = 0; j < result.length; j++) {
        if (result[j].id !== id) {
          continue;
        } else {
          result[j].quantity = result[j].quantity + 1;
          break;
        }
      }
    }
  }
  return result;
};
// GET - /users/:id/cart
exports.getProductsFromCart = async function (req, res, next) {
  try {
    const user = await db.User.findById(req.params.id);
    const cartInfo = user.cart;
    const cartResult = [];
    for (let i of cartInfo) {
      const product = await db.Product.findById(i);
      cartResult.push(product);
    }
    const result = counterForProductIds(cartResult);
    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
};

// POST - /users/:id/cartDelete/:productId
exports.deleteProductFromCart = async function (req, res, next) {
  try {
    const user = await db.User.findById(req.params.id);
    const cartInfo = user.cart;
    let id = req.params.productId;
    let productId = id.toString();
    const result = cartInfo.filter((item) => item.toString() !== productId);
    user.cart = result;
    await user.save();
    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
};

// GET - /users/products/:product_id
exports.getProduct = async function (req, res, next) {
  try {
    const product = await db.Product.findById(req.params.product_id);
    return res.status(200).json({ product });
  } catch (err) {
    return next(err);
  }
};

// POST - /users/:id/add/:productId
exports.addProductToCart = async function (req, res, next) {
  console.log(req.params.id, req.params.productId);
  try {
    //find the user
    const user = await db.User.findById(req.params.id);
    //push the productId into the user's cart list
    user.cart.push(req.params.productId);
    await user.save();
    const product = await db.Product.findById(req.params.productId);
    return res.status(200).json(product);
  } catch (err) {
    return next(err);
  }
};

// POST - /users/:id/drop/:productId
exports.dropProductFromCart = async function (req, res, next) {
  console.log(req.params.id, req.params.productId);

  try {
    //find the user
    const user = await db.User.findById(req.params.id);
    //drop the productId just once from the cart list
    const cartList = user.cart;
    console.log(cartList);
    for (let i = cartList.length - 1; i >= 0; i--) {
      let id = cartList[i].toString();
      console.log(cartList[i]);
      console.log(id);
      if (id === req.params.productId) {
        cartList.splice(i, 1);
        break;
      }
    }
    await user.save();
    const product = await db.Product.findById(req.params.productId);
    return res.status(200).json(product);
  } catch (err) {
    return next(err);
  }
};
