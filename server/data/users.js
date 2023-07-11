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
  
  newUser._id = insertInfo.insertedId.toString();
  return newUser;
};

const checkUser = async (email, password) => {
  username = validation.checkUsername(username);
  password = validation.checkPassword(password);
  
  const userCollection = await user();
  const user = await userCollection.findOne({ email: email });

  if (!user) {
    throw "User not found";
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw "Invalid email or password";
  }

  return user;
};

async getPetById(petId) {
  if (petId === undefined) throw 'must provide petId'
  const petCollection = await pets()
  let pet = await petCollection.findOne({ _id: ObjectId(petId) })
  if (pet === null) throw 'No pet with that id';
  delete pet.hashed_password;
  return pet
},

export default {
  createUser,
  checkUser,
};
