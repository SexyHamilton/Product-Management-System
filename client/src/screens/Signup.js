import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import validation from "../validation/signup";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 auto",
    maxWidth: "400px",
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "5px",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
  },
  textField: {
    margin: theme.spacing(1),
    width: "100%",
  },

  button: {
    textTransform: "none",
    margin: theme.spacing(1),
    width: "100%",
    backgroundColor: "#0000ff",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#512da8",
    },
  },
}));
export default function Signup() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let newUser = undefined;

    try {
      newUser = {
        email: validation.checkEmail(email),
        password: validation.checkPassword(password),
      };
      await createUser(newUser);
      alert("You have successfully create an account!");
      navigate("/");
    } catch (e) {
      alert(e);
    }
  };

  const createUser = async (user) => {
    try {
      const response = await axios.post("http://localhost:4000/signup", user);
      console.log("User created:", response.data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        console.log("Error creating user:", error.response.data);
        throw error.response.data.Error;
      }
      throw new Error("Cannot create user");
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <h1>Sign up an account</h1>
      <TextField
        className={classes.textField}
        id="signup-username"
        label="Username"
        variant="outlined"
        color="secondary"
        value={email}
        onChange={handleEmailChange}
        required
      />
      <TextField
        className={classes.textField}
        id="signup-pw"
        label="Password"
        variant="outlined"
        color="secondary"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        required
      />
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        type="submit"
      >
        Create account
      </Button>
      <p>
        Already have an account?<Link to="/login">Sign in</Link>
      </p>
    </form>
  );
}
