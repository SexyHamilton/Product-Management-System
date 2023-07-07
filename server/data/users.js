import bcrypt from "bcryptjs";
import validation from "../validation/user";
import { user, user } from "../config/mongoCollections.js";

const saltRounds = 10;

const createUser = async (email, password) => {
  email = validation.checkEmail(email);
  password = validation.checkPassword(password);
  const userCollection = await user();
  const userExists = await userCollection.findOne({ email: email });
  if (userExists) {
    throw "This Email Already Exist!";
  }

  const hashed_pw = await bcrypt.hash(password, saltRounds);
  let user = {
    email: email,
    password: hashed_pw,
  };
  const insertInfo = await userCollection.insertOne(user);

  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    throw "Could not create a user";
  }
  //   const newUser_id = insertInfo.insertedId.toString();

  //   return await petsData.getPetById(newPet_id);
  return user;
};

const checkUser = async (email, password) => {
  username = validation.checkUsername(username);
  password = validation.checkPassword(password);
  //query the db for username

  //compare the password
};

export default {
  createUser,
  checkUser,
};
