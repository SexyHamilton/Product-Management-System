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
        req.session.user = {
            userId: result._id.toString(),
            email: result.email,
        };
        res.status(200).json(result);
    } catch (e) {
        return res.status(400).json({ Error: e });
    }
});

//update password
router.route("/update").post(async (req, res) => {});

//user logout
router.route("/logout").get(async (req, res) => {
    if (req.session.user) {
        req.session.destroy();
        res.status(200).json({ Message: "You have been logged out" });
    } else {
        res.status(403).json({ Error: "Please login first" });
    }
    return;
});

export default router;
