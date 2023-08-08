const exportMethods = {
  checkEmail(email) {
    if (!email) {
      throw new Error("Email is not provided!");
    }
    if (typeof email !== "string") {
      throw new Error("Email should be a string!");
    }
    email = email.trim();
    if (email === "") {
      throw new Error("Email cannot be empty string or space only!");
    }
    email = email.toLowerCase();

    const spaceRegex = /\s/;
    if (spaceRegex.test(email)) {
      throw new Error("Email must not contain space!");
    }

    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email!");
    }
    return email;
  },
  checkPassword(password) {
    if (!password) {
      throw new Error("Password is not provided!");
    }
    if (typeof password !== "string") {
      throw new Error("Password should be a string!");
    }
    password = password.trim();
    if (password === "") {
      throw new Error("Password cannot be empty string or space only!");
    }
    if (password.length < 6) {
      throw new Error("Password must contain at least 6 characters!");
    }
    const spaceRegex = /\s/;
    if (spaceRegex.test(password)) {
      throw new Error("Password must not contain space!");
    }
    return password;
  },
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
