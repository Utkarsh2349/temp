import React from "react";
import { useEffect, useState } from "react";
import { register } from "../Services/user-service";
import { Login } from "./Login";
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
  const handleAlreadyRegisteredButton = (event) => {
    setIsRegistered(true);
  };

  return (
    <div
      style={{
        backgroundColor: "rgba(44,62,80",
      }}
    >
      {!isRegistered && (
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
                    type="text"
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
                    type="text"
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
