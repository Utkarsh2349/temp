import { useEffect, useState } from "react";
import { register } from "../Services/user-service";
import { Login } from "./Login";

const Register = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: "",
    password: "",
    age: "",
    salary: "",
  });
  //   useEffect(() => {}, [isRegistered]);
  const handleRegisterFormSubmit = (event) => {
    event.preventDefault();
    console.log(registerData);
    setIsRegistered(true);
    register(registerData).then((resp) => console.log(registerData));
  };
  const handleChange = (event, property) => {
    setRegisterData({
      ...registerData,
      [property]: event.target.value,
    });
  };
  const handleAlreadyRegiteredbutton = (event) => {
    setIsRegistered(true);
  };

  return (
    <>
      {registerData.name} {registerData.age} {registerData.password}{" "}
      {registerData.salary}
      {!isRegistered && (
        <form>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={registerData.name}
            onChange={(event) => {
              handleChange(event, "name");
            }}
          />
          <br />
          <br />

          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            name="password"
            value={registerData.password}
            onChange={(event) => {
              handleChange(event, "password");
            }}
          />
          <br />
          <br />

          <label htmlFor="age">Age</label>
          <input
            type="text"
            id="age"
            name="age"
            value={registerData.age}
            onChange={(event) => {
              handleChange(event, "age");
            }}
          />
          <br />
          <br />

          <label htmlFor="salary">Salary</label>
          <input
            type="text"
            id="salary"
            name="salary"
            value={registerData.salary}
            onChange={(event) => {
              handleChange(event, "salary");
            }}
          />
          <br />
          <br />

          <button onClick={handleRegisterFormSubmit}>Register</button>
          <br />
          <br />
          <button onClick={handleAlreadyRegiteredbutton}>LogIn</button>
        </form>
      )}
      {isRegistered && <Login />}
    </>
  );
};
export default Register;
