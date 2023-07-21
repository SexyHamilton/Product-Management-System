const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = async function (req, res, next) {
  try {
    // find if the user exist in the db with email
    const user = await db.User.findOne({
      email: req.body.email,
    });
    const { id, email } = user;
    //compare the password
    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      const token = await jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET_KEY
      );
      return res.status(200).json({
        id,
        email,
        token,
      });
    } else {
      return next({
        status: 400,
        message: "Invalid Email / Password",
      });
    }
  } catch (err) {
    return next({
      status: 400,
      message: "Invalid Email / Password",
    });
  }
};

exports.signup = async function (req, res, next) {
  //create new user from req.body
  try {
    const user = await db.User.create(req.body);
    const { id, email } = user;
    //generate jwt token
    const token = await jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET_KEY
    );
    return res.status(200).json({
      id,
      email,
      token,
    });
  } catch (err) {
    if (err.code === 11000) {
      err.message = "Sorry, the email is taken";
    }
    return next({
      status: 400,
      message: err.message,
    });
  }
};
