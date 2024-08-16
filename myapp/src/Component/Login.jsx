import React from "react";
import { useState } from "react";
import { login } from "../Services/user-service";
import Register from "./Register";
import DisplayEmploye from "./DisplayEmploye";
import { toast, ToastContainer } from "react-toastify";

import { Container, Form, FormGroup, Input, Label, Button } from "reactstrap";
import Cookies from "js-cookie";
import "./Login.css";

export const Login = () => {
  const [loginData, setLoginData] = useState({ name: "", password: "" });
  const [isRegistered2, setIsRegistered2] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleChange = (event, property) => {
    setLoginData({ ...loginData, [property]: event.target.value });
  };
  const handleLoginButton = (event) => {
    event.preventDefault();
    login(loginData)
      .then((resp) => {
        Cookies.set("username", loginData.name, { expires: 1 });
        setIsLoggedIn(true);
        toast.success("Log In Successfull");
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message);
        } else if (error.request) {
          toast.error("Unable to connect");
        } else {
          console.log(error);
          toast.error(error.response.data.message);
        }
      });
  };
  const handleRegisterButton = (event) => {
    setIsRegistered2(false);
  };
  const isFormComplete = () => {
    return Object.values(loginData).every((value) => value.trim() !== "");
  };

  return (
    <div
      style={{
        backgroundColor: "rgba(44,62,80",
      }}
    >
      {isRegistered2 && !isLoggedIn && (
        <Container
          style={{
            backgroundColor: "#FFDAB9",
            maxWidth: "500px",
            margin: "0 auto",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow:
              "0 10px 20px rgba(0, 0, 0, 0.5), 0 15px 40px rgba(0, 0, 0, 0.5)",
            transform: "translateY(100px)",
          }}
        >
          <Form>
            <FormGroup floating>
              <Input
                type="text"
                id="name"
                name="name"
                value={loginData.name}
                onChange={(event) => handleChange(event, "name")}
              />
              <Label htmlFor="name">Name</Label>{" "}
            </FormGroup>
            <FormGroup floating>
              <Input
                type="password"
                name="password"
                id="password"
                value={loginData.password}
                onChange={(event) => handleChange(event, "password")}
              />
              <Label htmlFor="password">Password</Label>{" "}
            </FormGroup>
            <br /> <br />
            <Button
              disabled={!isFormComplete()}
              title={
                !isFormComplete()
                  ? "Please fill out all the mandatory fields"
                  : "Login"
              }
              color="primary"
              onClick={handleLoginButton}
            >
              Login
            </Button>
            <Button title="Register" onClick={handleRegisterButton}>
              Register
            </Button>
          </Form>
        </Container>
      )}
      <div>{!isRegistered2 && <Register />}</div>
      <div style={{ display: isLoggedIn ? "block" : "none" }}>
        {isLoggedIn && <DisplayEmploye />}
      </div>
    </div>
  );
};
