import React from "react";
import ErrorOutline from "@mui/icons-material/ErrorOutline";
import { purple } from "@mui/material/colors";
import Typography from "@material-ui/core/Typography";
import { Button, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "left",
    margin: "0 auto",
    maxWidth: "660px",
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "5px",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
  },
  textField: {
    margin: theme.spacing(1),
    width: "100%",
  },
  select: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  formControl: {
    margin: theme.spacing(1),
    width: "100%",
  },

  button: {
    textTransform: "none",
    margin: theme.spacing(1),
    width: "100%",
    backgroundColor: "#5048E5",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#512da8",
    },
  },

  label: {
    paddingLeft: "10px",
    color: "#6B7280",
  },
}));
export default function ErrorPage() {
  const classes = useStyles();
  return (
    <div style={{ maxWidth: "660px", margin: "auto" }}>
      <form className={classes.form}>
        <ErrorOutline sx={{ color: purple[300], fontSize: 60 }} />
        <br />
        <br />
        <Typography variant="h5">Opps, something went wrong!</Typography>
        <br />
        <Button
          className={classes.button}
          component={Link}
          to="/"
          variant="contained"
        >
          Go Home
        </Button>
      </form>
    </div>
  );
}
