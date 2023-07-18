import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
// import { ProfileContext } from "./context/UserContext";

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

export default function Signin() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // //set user profile as global state
  // const [userProfile, setUserProfile] = useContext(ProfileContext);
  // const userProfileFromLocalStorage = JSON.parse(
  //   sessionStorage.getItem("userInfo")
  // );

  // useEffect(() => {
  //   // Redirects to Home page if user is already logged in
  //   if (userProfile || userProfileFromLocalStorage) {
  //     navigate("/", { replace: true });
  //   }
  //   window.onstorage = (event) => {
  //     if (event.key === "userProfile") {
  //       window.location.reload();
  //     }
  //   };
  // }, [userProfile, navigate, setUserProfile, userProfileFromLocalStorage]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const loginUser = async (user) => {
    try {
      const response = await axios.post("http://localhost:4000/login", user, {
        withCredentials: true,
      });
      console.log("User login:", response.data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        console.log("Error login user:", error.response.data);
        throw error.response.data.Error;
      }
      throw new Error("Cannot login user");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let user = {
      email: email,
      password: password,
    };
    try {
      user = await loginUser(user);
      // setUserProfile(user);
      // console.log(userProfile);
      // const userStr = JSON.stringify(user);
      // sessionStorage.setItem("userInfo", userStr);
      alert("You have successfully login!");
      setTimeout(() => {
        navigate("/", { state: { user: user } });
      }, 1000);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div>
      <form className={classes.form} onSubmit={handleSubmit}>
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
        <div className="words">
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
        <div className="forget-pd">
          <Link to="/update">Forget password?</Link>
        </div>
      </form>
    </div>
  );
}
