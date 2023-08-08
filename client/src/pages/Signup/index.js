import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { signUpUser } from "app/userSlice";
import { useDispatch } from "react-redux";
import validation from "validation/product";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = (data) => {
    data.preventDefault();
    try {
      let newUser = {
        email: validation.checkEmail(email),
        password: validation.checkPassword(password),
      };
      dispatch(signUpUser(newUser)).then(() => navigate("/login"));
      alert("You have successfully create an account!");
    } catch (e) {
      alert(e);
    }
  };

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <h1>Sign up an account</h1>
      <TextField
        className={classes.textField}
        id="signup-email"
        label="Email"
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
