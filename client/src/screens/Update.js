import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Typography } from "@material-ui/core";

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
export default function Update() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  };
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Typography variant="h4">Update your password</Typography>
      <br />
      <Typography variant="body2">
        Enter your email link, we will send you the recovery link
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
