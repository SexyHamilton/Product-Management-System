import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { updateUser } from "app/userSlice";
import { useNavigate } from "react-router-dom";
import validation from "validation/product";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "auto",
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
export default function UpdatePassword() {
  const classes = useStyles();
  const dispatch = useDispatch();
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
    try {
      let newOne = {
        email: validation.checkEmail(email),
        password: validation.checkPassword(password),
      };
      console.log(newOne);
      dispatch(updateUser(newOne)).then(() => {
        navigate("/login");
      });
    } catch (err) {
      alert(err);
    }
  };
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Typography variant="h4">Update your password</Typography>
      <br />
      <Typography variant="body2">
        Enter your email, and your new password.
      </Typography>
      <br />

      <TextField
        className={classes.textField}
        id="signup-username"
        label="Email"
        variant="outlined"
        color="secondary"
        value={email}
        onChange={handleEmailChange}
        required
      />
      <TextField
        className={classes.textField}
        id="signup-password"
        label="Password"
        type="password"
        variant="outlined"
        color="secondary"
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
        Update password
      </Button>
    </form>
  );
}
