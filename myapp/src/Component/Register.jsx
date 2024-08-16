import React from "react";
import { useEffect, useState } from "react";
import { register } from "../Services/user-service";
import { Login } from "./Login";
import { toast } from "react-toastify";
import {
  Form,
  Label,
  Input,
  FormGroup,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
const Register = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: "",
    password: "",
    age: "",
    salary: "",
    email: "",
    phoneNo: "",
  });
  //   useEffect(() => {}, [isRegistered]);
  const handleRegisterFormSubmit = (event) => {
    event.preventDefault();
    register(registerData)
      .then((resp) => {
        console.log(registerData);
        setIsRegistered(true);
      })
      .catch((err) => {
        if (err.response) {
          console.log("Error", err.response);
          if (err.response.status === 400) {
            const { age, salary, name, phoneNo } = err.response.data;
            console.log("Error", err.response.status);
            if (age) toast.error(err.response.data.age);
            else if (salary) toast.error(err.response.data.salary);
            else if (phoneNo) toast.error(err.response.data.phoneNo);
          }
        } else if (err.request) {
          toast.error("Unable to connect");
        } else {
          // console.log(error);
          toast.error(err.response.data.message);
        }
      });
  };
  const handleChange = (event, property) => {
    setRegisterData({
      ...registerData,
      [property]: event.target.value,
    });
  };
  const handleAlreadyRegisteredButton = (event) => {
    setIsRegistered(true);
  };

  const isFormComplete = () => {
    return Object.values(registerData).every((value) => value.trim() !== "");
  };

  return (
    <div
      style={{
        backgroundColor: "rgba(44,62,80)",
        // overflow:"auto",
        height: "50vh",
      }}
    >
      {!isRegistered && (
        <Container
          style={{
            backgroundColor: "#FFDAB9",
            maxWidth: "500px",
            // maxHeight:"100%",
            margin: "0 auto",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow:
              "0 10px 20px rgba(0, 0, 0, 0.5), 0 15px 40px rgba(0, 0, 0, 0.5)",
            transform: "translateY(40px)",
          }}
        >
          <Row className="justify-content-center">
            <Col md="8">
              <Form>
                <FormGroup floating>
                  <Input
                    type="text"
                    id="exampleName"
                    name="name"
                    value={registerData.name}
                    onChange={(event) => {
                      handleChange(event, "name");
                    }}
                  />
                  <Label htmlFor="exampleName">Name</Label>
                </FormGroup>
                <FormGroup floating>
                  <Input
                    type="text"
                    id="email"
                    name="email"
                    value={registerData.email}
                    onChange={(event) => {
                      handleChange(event, "email");
                    }}
                  />
                  <Label htmlFor="email">Email Id</Label>
                </FormGroup>
                <FormGroup floating>
                  <Input
                    type="text"
                    id="phoneNo"
                    name="phoneNo"
                    value={registerData.phoneNo}
                    onChange={(event) => {
                      handleChange(event, "phoneNo");
                    }}
                  />
                  <Label htmlFor="phoneNo">Phone Number</Label>
                </FormGroup>

                <FormGroup floating>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    value={registerData.password}
                    onChange={(event) => {
                      handleChange(event, "password");
                    }}
                  />
                  <Label htmlFor="password">Password</Label>
                </FormGroup>

                <FormGroup floating>
                  <Input
                    type="number"
                    id="age"
                    name="age"
                    value={registerData.age}
                    onChange={(event) => {
                      handleChange(event, "age");
                    }}
                  />
                  <Label htmlFor="age">Age</Label>
                </FormGroup>

                <FormGroup floating>
                  <Input
                    type="number"
                    id="salary"
                    name="salary"
                    value={registerData.salary}
                    onChange={(event) => {
                      handleChange(event, "salary");
                    }}
                  />
                  <Label htmlFor="salary">Salary</Label>
                </FormGroup>

                <Button
                  disabled={!isFormComplete()}
                  color="primary"
                  className="ml-2"
                  onClick={handleRegisterFormSubmit}
                >
                  Register
                </Button>

                <Button
                  color="secondary"
                  onClick={handleAlreadyRegisteredButton}
                  className="ml-2"
                >
                  Log In
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      )}
      {isRegistered && <Login />}
    </div>
  );
};
export default Register;
