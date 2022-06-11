import { React, useEffect, useRef, useState } from "react";
import {
  Grid,
  Button,
  Typography,
  TextField,
  IconButton,
  Input,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  Avatar,
} from "@mui/material";

import { Visibility, VisibilityOff, Email } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";

import logo from "../assets/images/logo.svg";

import { post } from "../utils";
import MySnackbar from "./MySnackbar";
import axios from "axios";

function Login(props) {
  const [snackbar, setSnackbar] = useState(false);
  const [apiResponse, setApiResponse] = useState({
    type: "success",
    message: "This is a Success Message !",
  });
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const resultReceived = useRef(false);

  useEffect(() => {
    if (resultReceived.current === true) {
      setSnackbar(true);
      resultReceived.current = false;
    }
  }, [apiResponse]);

  function handleSubmit() {
    post(
      `${process.env.REACT_APP_API_URL}/auth/admin/login`,
      {
        email: values.email,
        password: values.password,
      },
      { withCredentials: true }
    //   {
    //     headers: {
    //       "Access-Control-Allow-Origin": "*",
    //       "Access-Control-Allow-Credentials": true,
    //     },
    //   }
    )
      .then((apiResponseResult) => {
        console.log(apiResponseResult);

        if (
          apiResponseResult.status === 200 &&
          apiResponseResult.data.message !== undefined
        ) {
          props.setLogin(apiResponseResult.data.isLoggedIn);
          props.setUserData({
              ...props.userData,
              name: apiResponseResult.data.name,
              profile_picture: apiResponseResult.data.profile_picture
          })
        }
      })
      .catch((error) => {
        console.log(error);
        if (
          error.response.status === 400 ||
          (401 && error.response.data.message !== undefined)
        ) {
          setApiResponse({
            ...apiResponse,
            type: "error",
            message: error.response.data.message,
          });
          resultReceived.current = true;
        }
      });
  };

  const displayCurrentYear = new Date().getFullYear();

  return (
    <Grid style={{ margin: "-0.5rem" }}>
      <MySnackbar
        open={snackbar}
        setSnackbar={setSnackbar}
        type={apiResponse.type}
        message={apiResponse.message}
      />

      <Grid container>
        <Grid
          xl={6}
          lg={6}
          md={6}
          sm={12}
          style={{
            height: "91.5vh",
            background:
              "url('https://images.unsplash.com/photo-1555529902-5261145633bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "60%",
            padding: "2rem",
          }}
        >
          <Typography style={{ transform: "translate(5%, 50%)" }}>
            <h1
              style={{
                fontFamily: "Open Sans",
                fontSize: "2.2rem",
                color: "#fff",
              }}
            >
              Welcome Back !
            </h1>

            <p style={{ fontSize: "19px", width: "75%", color: "#FDFEFE" }}>
              Welcome to the Innovantage's Admin Portal exclusively built for
              the Innovantage's team only where you can manage all your queries
              and orders, manage shipment trackings and much more.
            </p>

            <p style={{ fontSize: "19px", width: "75%", color: "#FDFEFE" }}>
              Before Moving on, please enter your login credentials.
            </p>
          </Typography>
        </Grid>
        <Grid
          xl={6}
          lg={6}
          md={6}
          sm={12}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "1rem",
          }}
        >
          <Grid>
            <Typography
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Avatar
                alt="company-logo"
                src={logo}
                style={{
                  height: "80px",
                  width: "80px",
                  backgroundColor: "#F4F6F6",
                  marginBottom: "-0.4rem",
                }}
              />
            </Typography>

            <h1
              style={{
                width: "100%",
                textAlign: "center",
                fontFamily: "Open Sans",
              }}
            >
              Sign in
            </h1>

            <TextField
              label="Email Address"
              margin="normal"
              style={{ width: "100%" }}
              value={values.email}
              onChange={handleChange("email")}
            />

            <FormControl
              sx={{ mt: 1, mb: 1, width: "100%" }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                onKeyDown={(event) => { 
                  if(event.key === 'Enter') {
                    console.log('entered');
                    handleSubmit();
                  }
                 }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <Button
              variant="contained"
              style={{ width: "100%", margin: "1rem auto" }}
              onClick={handleSubmit}
            >
              Sign In
            </Button>

            {/* <a href="" style={{ color: "#1976d2" }} >Forgot Password ?</a> */}
          </Grid>
        </Grid>

        <Grid
          style={{
            backgroundColor: "#0a1929",
            color: "#fff",
            padding: "1rem",
            width: "100%",
          }}
          container
          justifyContent="space-evenly"
        >
          <Grid item xl={8} lg={8} md={8} sm={12}>
            <Typography>
              Copyright © {displayCurrentYear} | Innovantage Solutions Private
              Limited. | All rights reserved.
            </Typography>
          </Grid>
          <Grid item xl={4} lg={4} md={4} sm={12}>
            <Typography style={{ textAlign: "center", fontSize: "17px" }}>
              Designed and Developed by{" "}
              {/* <FavoriteIcon
                fontSize="small"
                style={{
                    position: "relative",
                    top: "4px",
                    marginLeft: "0.2rem",
                    marginRight: "0.2rem",
                    color: "#00aeff",
                }}
                />{" "} */}
              <a
                href="https://raman5911.github.io"
                target="_blank"
                style={{
                  textDecoration: "none",
                  color: "#66DCFF",
                }}
              >
                Ramanpreet Singh
              </a>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Login;
