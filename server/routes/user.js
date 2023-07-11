import express from "express";
import validation from "../validation/user";
import user from "../data/users";

const router = express.Router();

router.route("/signup").post(async (req, res) => {
    try {
        const { email, password } = req.body;
    
        // Validate email and password
        const validatedEmail = validation.checkEmail(email);
        const validatedPassword = validation.checkPassword(password);
    
        // Create user
        const newUser = await user.createUser(validatedEmail, validatedPassword);
    
        // Set up additional logic (e.g., sending a confirmation email, etc.)
    
        res.status(200).json({ message: "User created successfully", user: newUser });
    } catch (error) {
    res.status(400).json({ error: error.message });
    }
});

router.route("/login").post(async (req, res) => {
    try {
        const { email, password } = req.body;
    
        // Validate email and password
        const validatedEmail = validation.checkEmail(email);
        const validatedPassword = validation.checkPassword(password);
    
        // Check user credentials
        const userCheck = await user.checkUser(validatedEmail, validatedPassword);
    
        // Set up authentication logic here (e.g., creating a session, generating a token, etc.)
    
        res.status(200).json({ message: "Login successful", user: userCheck });
    } catch (error) {
    res.status(400).json({ error: error.message });
    }
});

//update password
router.route("/update").post(async (req, res) => {});
