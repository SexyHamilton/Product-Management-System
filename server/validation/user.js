const exportMethods = {
  checkEmail(email) {
    if (!email) {
      throw "Email is not provided!";
    }
    if (typeof email !== "string") {
      throw "Email should be a string!";
    }
    email = email.trim();
    if (email === "") {
      throw "Email cannot be empty string or space only!";
    }
    email = email.toLowerCase();

    const spaceRegex = /\s/;
    if (spaceRegex.test(email)) {
      throw "Email must not contain space!";
    }

    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
    if (!emailRegex.test(email)) {
      throw "Invalid email!";
    }
    return email;
  },

  checkPassword(password) {
    if (!password) {
      throw "Password is not provided!";
    }
    if (typeof password !== "string") {
      throw "Password should be a string!";
    }
    password = password.trim();
    if (password === "") {
      throw "Password cannot be empty string or space only!";
    }
    if (password.length < 6) {
      throw "Password must contain at least 6 characters!";
    }
    const spaceRegex = /\s/;
    if (spaceRegex.test(password)) {
      throw "Password must not contain space!";
    }
    const requireRegex = /(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W)/;
    if (!requireRegex.test(password)) {
      throw "Password must contain at least 1 uppercase character, at least 1 lowercase character, at least 1 number, at least 1 special character!";
    }
    return password;
  },
};
export default exportMethods;
