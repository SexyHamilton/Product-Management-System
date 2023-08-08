import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "app/userSlice";
import styles from "./style.module.css";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import { useState } from "react";
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
    marginTop: "10vh",
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
export default function LogIn() {
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

  const onSubmit = (data) => {
    data.preventDefault();
    try {
      let user = {
        email: email,
        password: password,
      };
      dispatch(authUser(user)).then(() => {
        navigate("/");
      });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="login_form">
      <form className={classes.form} onSubmit={onSubmit}>
        <h1>Sign in to your account</h1>
        <TextField
          className={classes.textField}
          id="login-username"
          label="Email"
          variant="outlined"
          color="secondary"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <TextField
          className={classes.textField}
          id="login-pw"
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
          Sign In
        </Button>
        <div className={styles.words}>
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
        <div className={styles.forget_pd}>
          <Link to="/updatePassword">Forget password?</Link>
        </div>
      </form>
    </div>
  );
}
