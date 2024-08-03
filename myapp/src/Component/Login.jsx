import { useState } from "react";
import { login } from "../Services/user-service";
import Register from "./Register";
import DisplayEmploye from "./DisplayEmploye";
export const Login = () => {
  const [loginData, setLoginData] = useState({ name: "", password: "" });
  const [isRegistered2, setIsRegistered2] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleChange = (event, property) => {
    setLoginData({ ...loginData, [property]: event.target.value });
  };
  const handleLoginButton = (event) => {
    event.preventDefault();
    login(loginData).then((resp) => console.log(resp));
    setIsLoggedIn(true);
  };
  const handleRegisterButton = (event) => {
    setIsRegistered2(false);
  };

  return (
    <>
      {isRegistered2 && !isLoggedIn && (
        <form>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={loginData.name}
            onChange={(event) => handleChange(event, "name")}
          />{" "}
          <br />
          <br />
          <label htmlFor="password">Password</label>
          <input
            type="text"
            name="password"
            id="password"
            value={loginData.password}
            onChange={(event) => handleChange(event, "password")}
          />{" "}
          <br /> <br />
          <button onClick={handleLoginButton}>Login</button>
          <button onClick={handleRegisterButton}>Register</button>
        </form>
      )}
      {!isRegistered2 && <Register />}
      {isLoggedIn && <DisplayEmploye />}
    </>
  );
};
