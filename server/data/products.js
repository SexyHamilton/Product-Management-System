import { products } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import validation from "../validation/product.js";

const createProduct = async (
  name,
  description,
  category,
  price,
  quantity,
  link
) => {
  name = validation.checkName(name);
  description = validation.checkDescription(description);
  category = validation.checkCategory(category);
  price = validation.checkPrice(price);
  quantity = validation.checkQuantity(quantity);
  link = validation.checkLink(link);

  const productsCol = await products();
  const productExists = await productsCol.findOne({ name: name });

  if (productExists) {
    throw "The product already exist";
  }
  let newProduct = {
    name: name,
    description: description,
    category: category,
    price: price,
    quantity: quantity,
    link: link,
  };

  const insertInfo = await productsCol.insertOne(newProduct);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    throw "Could not create a product";
  }

  const newProduct_id = insertInfo.insertedId.toString();

  return await getProductById(newProduct_id);
};

const getProductById = async (id) => {
  if (id === undefined) throw "must provide id";
  const productsCol = await products();
  let product = await productsCol.findOne({ _id: new ObjectId(id) });
  if (product === null) throw "No product with that id";
  return product;
};

const updateProduct = async (id, updateFields) => {
  const oldOne = await getProductById(id);
  console.log(oldOne);

  let newProduct = {};
  let numOfFieldToUpdate = 0;
  if (updateFields.name != undefined && updateFields.name !== oldOne.name) {
    newProduct.name = validation.checkName(updateFields.name);
    numOfFieldToUpdate++;
  } else {
    updateFields.name = oldOne.name;
  }

  if (
    updateFields.description != undefined &&
    updateFields.description !== oldOne.description
  ) {
    newProduct.description = validation.checkDescription(
      updateFields.description
    );
    numOfFieldToUpdate++;
  } else {
    updateFields.description = oldOne.description;
  }

  if (
    updateFields.category != undefined &&
    updateFields.category !== oldOne.category
  ) {
    newProduct.category = validation.checkCategory(updateFields.category);
    numOfFieldToUpdate++;
  } else {
    updateFields.category = oldOne.category;
  }

  if (updateFields.price != undefined && updateFields.price !== oldOne.price) {
    newProduct.price = validation.checkPrice(updateFields.price);
    numOfFieldToUpdate++;
  } else {
    updateFields.price = oldOne.price;
  }

  if (
    updateFields.quantity != undefined &&
    updateFields.quantity !== oldOne.quantity
  ) {
    newProduct.quantity = validation.checkQuantity(updateFields.quantity);
    numOfFieldToUpdate++;
  } else {
    updateFields.quantity = oldOne.quantity;
  }
  if (updateFields.link != undefined && updateFields.link !== oldOne.link) {
    newProduct.link = validation.checkLink(updateFields.link);
    numOfFieldToUpdate++;
  } else {
    updateFields.link = oldOne.link;
  }

  if (numOfFieldToUpdate == 0) {
    throw "there is nothing need to update";
  }
  const productsCol = await products();
  const updateInfo = await productsCol.updateOne(
    { _id: new ObjectId(id) },
    { $set: newProduct }
  );
  if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
    throw "Update failed";

  return await getProductById(id);
};

const getAllProducts = async () => {
  if (arguments.length !== 0) throw "error arguments";
  const productsCol = await products();
  const productList = await productsCol.find({}).toArray();
  if (!productList) throw "Could not get all products";
  for (let i = 0; i < productList.length; i++) {
    productList[i]._id = productList[i]._id.toString();
  }

  return productList;
};

export default {
  createProduct,
  updateProduct,
  getProductById,
  getAllProducts,
};
