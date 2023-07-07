import express from "express";
import validation from "../validation/user";
import user from "../data/users";

const router = express.Router();

router.route("/signup").post(async (req, res) => {});

router.route("/login").post(async (req, res) => {});

//update password
router.route("/update").post(async (req, res) => {});
