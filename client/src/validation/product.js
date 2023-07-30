const exportMethods = {
  checkName(name) {
    if (!name) {
      throw new Error("name is not provided!");
    }
    if (typeof name !== "string") {
      throw new Error("name should be a string!");
    }
    name = name.trim();
    if (name === "") {
      throw new Error("name cannot be empty string or spaces only!");
    }
    return name;
  },

  checkDescription(description) {
    if (!description) {
      throw new Error("description is not provided!");
    }
    if (typeof description !== "string") {
      throw new Error("description should be a string!");
    }
    description = description.trim();
    if (description === "") {
      throw new Error("description cannot be empty string or space only!");
    }
    return description;
  },

  checkCategory(category) {
    if (!category) {
      throw new Error("category is not provided!");
    }
    if (typeof category !== "string") {
      throw new Error("category should be string");
    }
    category = category.trim();
    if (category === "") {
      throw new Error("category cannot be empty string or space only!");
    }

    return category;
  },

  checkPrice(price) {
    if (!price) {
      return undefined;
    }
    if (!(!isNaN(price) && !isNaN(parseFloat(price)))) {
      throw new Error(`${price} is not an integer`);
    }
    price = Number(price);
    if (price < 0) {
      throw new Error("price range is invalid, should be larger than 0");
    }
    return price;
  },

  checkQuantity(quantity) {
    if (!quantity) {
      return undefined;
    }
    if (!(!isNaN(quantity) && !isNaN(parseFloat(quantity)))) {
      throw new Error(`${quantity} is not an integer`);
    }
    quantity = Number(quantity);
    if (quantity < 0) {
      throw new Error("quantity range is invalid, should be larger than 0");
    }
    return quantity;
  },

  checkLink(link) {
    if (!link) {
      throw new Error("link is not provided");
    }
    // if (isUrlHttp(link) === true) {
    //   return link;
    // } else {
    //   throw new Error("This http link is not valid");
    // }
    return link;
  },
};

export default exportMethods;
