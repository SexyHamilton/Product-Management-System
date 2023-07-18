import validation from "../validation/user.js";
import { users } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

const saltRounds = 10;

const createUser = async (email, password) => {
  email = validation.checkEmail(email);
  password = validation.checkPassword(password);
  const userCollection = await users();
  const userExists = await userCollection.findOne({ email: email });
  if (userExists) {
    throw "This Email Already Exist!";
  }

  const hashed_pw = await bcrypt.hash(password, saltRounds);
  let newUser = {
    email: email,
    password: hashed_pw,
  };
  const insertInfo = await userCollection.insertOne(newUser);

  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    throw "Could not create a user";
  }
  const newUser_id = insertInfo.insertedId.toString();

  return await getUserById(newUser_id);
};

const checkUser = async (email, password) => {
  email = validation.checkEmail(email);
  password = validation.checkPassword(password);
  //query the db for username
  const userCollection = await users();
  const oldUser = await userCollection.findOne({ email: email });
  if (!oldUser) {
    throw "Either the email or password is invalid!";
  }
  const oldPw = oldUser.password;
  const compareResult = await bcrypt.compare(password, oldPw);
  if (!compareResult) {
    throw "Either the email or password is invalid!";
  }

  return await getUserById(oldUser._id.toString());
  //compare the password
};
const getUserById = async (userId) => {
  if (userId === undefined) throw "must provide userId";
  const userCollection = await users();
  let user = await userCollection.findOne({ _id: new ObjectId(userId) });
  if (user === null) throw "No user with that id";
  delete user.password;
  return user;
};

const updateUser = async (email) => {};

export default {
  createUser,
  checkUser,
  getUserById,
  updateUser,
};
