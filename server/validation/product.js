import isUrlHttp from "is-url-http";
const exportMethods = {
  checkName(name) {
    if (!name) {
      throw "name is not provided!";
    }
    if (typeof name !== "string") {
      throw "name should be a string!";
    }
    name = name.trim();
    if (name === "") {
      throw "name cannot be empty string or spaces only!";
    }
    const spaceRegex = /\s/;
    if (spaceRegex.test(name)) {
      throw "name must not contain space!";
    }
    name = name.toLowerCase();
    const alphanumericRegex = /^\w+$/;
    if (!alphanumericRegex.test(name)) {
      throw "name must contain letters and numbers only!";
    }
    return name;
  },

  checkDescription(description) {
    if (!description) {
      throw "description is not provided!";
    }
    if (typeof description !== "string") {
      throw "description should be a string!";
    }
    description = description.trim();
    if (description === "") {
      throw "description cannot be empty string or space only!";
    }
    return description;
  },

  checkCategory(category) {
    if (!category) {
      throw "category is not provided!";
    }
    if (typeof category !== "string") {
      throw "category should be string";
    }
    category = category.trim();
    if (category === "") {
      throw "category cannot be empty string or space only!";
    }

    return category;
  },

  checkPrice(price) {
    if (!price) {
      return undefined;
    }
    if (!(!isNaN(price) && !isNaN(parseFloat(price)))) {
      throw `${price} is not an integer`;
    }
    price = Number(price);
    if (price < 0) {
      throw "price range is invalid, should be larger than 0";
    }
    return price;
  },

  checkQuantity(quantity) {
    if (!quantity) {
      return undefined;
    }
    if (!(!isNaN(quantity) && !isNaN(parseFloat(quantity)))) {
      throw `${quantity} is not an integer`;
    }
    quantity = Number(quantity);
    if (quantity < 0) {
      throw "quantity range is invalid, should be larger than 0";
    }
    return quantity;
  },

  checkLink(link) {
    if (!link) {
      throw "link is not provided";
    }
    if (isUrlHttp(link) == true) {
      return link;
    } else {
      throw "This http link is not valid";
    }
  },
};

export default exportMethods;
