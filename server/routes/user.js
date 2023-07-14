import express from "express";
import user from "../data/users.js";
import validation from "../validation/user.js";


const router = express.Router();

router.route("/signup").post(async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  try {
    email = validation.checkEmail(email);
    password = validation.checkPassword(password);
  } catch (e) {
    return res.status(400).json({ Error: e });
  }
  try {
    const newUser = await user.createUser(email, password);
    res.status(200).json(newUser);
  } catch (e) {
    return res.status(400).json({ Error: e });
  }
});

router.route("/login").post(async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  try {
    email = validation.checkEmail(email);
    password = validation.checkPassword(password);
  } catch (e) {
    return res.status(400).json({ Error: e });
  }

  try {
    const result = await user.checkUser(email, password);
    res.status(200).json(result);
  } catch (e) {
    return res.status(400).json({ Error: e });
  }
});

//update password
router.route("/update").post(async (req, res) => {
  
});

export default router;
