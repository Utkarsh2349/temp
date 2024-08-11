import React, { useEffect, useState } from "react";
import {
  addCurrentEmployeeAddress,
  addPermanentEmployeeAddress,
  deleteEmployee,
  deleteEmployeeCurrentAddress,
  deleteEmployeePermanentAddress,
  getEmployee,
  updateEmployee,
  updateEmployeeAddress,
} from "../Services/user-service";
import { Button, Input } from "reactstrap";
import Cookies from "js-cookie";
import { Login } from "./Login";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem,
  Form,
  FormGroup,
  Label,
} from "reactstrap";
import EditCurrentAddressOn from "./EditCurrentAddressOn";
import EditPermanentAddress from "./EditPermanentAddress";

const DisplayEmploye = () => {
  var username = Cookies.get("username");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userData, setUserData] = useState(null);
  const [isEdit1On, setIsEdit1On] = useState(false);
  const [isEditCurrentAddressOn, setIsEditCurrentAddressOn] = useState(false);
  const [isEditCurrentAddress, setIsEditCurrentAddress] = useState(false);
  const [isEditPermanentAddressOn, setIsEditPermanentAddressOn] =
    useState(false);
  const [isEditPermanentAddress, setIsEditPermanentAddress] = useState(false);
  const [editUserData, setEditUserData] = useState(null);
  const [addressToBeAdded, setAddressToBeAdded] = useState({
    city: "",
    state: "",
  });
  const [addressToBeAdded2, setAddressToBeAdded2] = useState({
    city: "",
    state: "",
  });

  const [isAddCurrentAddressOn, setIsAddCurrentAddressOn] = useState(false);
  const [isAddPermanentAddressOn, setIsAddPermanentAddressOn] = useState(false);
  const [isCurrentAddressDeleted, setIsCurrentAddressDeleted] = useState(false);
  const [isPermanentAddressDeleted, setIsPermanentAddressDeleted] =
    useState(false);
  useEffect(() => {
    getEmployee(username).then((response) => {
      setUserData(response);
      console.log(userData, editUserData);
      setIsAddCurrentAddressOn(false);
      setIsCurrentAddressDeleted(false);
      setIsPermanentAddressDeleted(false);
      setIsAddPermanentAddressOn(false);
      setIsEditCurrentAddress(false);
    });
  }, [
    isEdit1On,
    isAddCurrentAddressOn,
    isAddPermanentAddressOn,
    isCurrentAddressDeleted,
    isPermanentAddressDeleted,
    isEditCurrentAddress,
    isEditPermanentAddress,
  ]);

  useEffect(() => {}, [userData]);
  useEffect(() => {}, [editUserData]);

  const handleLogout = (event) => {
    setIsLoggedIn(false);
    Cookies.remove("username");
  };
  const handleIsEdit1 = () => {
    setEditUserData(userData);
    console.log(userData, editUserData);
    setIsEdit1On(true);
  };

  const handleSaveEdited = () => {
    console.log(editUserData);
    const { emp } = editUserData;
    const dataToSend = { name: emp.name, age: emp.age, salary: emp.salary };
    updateEmployee(Cookies.get("username"), dataToSend).then((resp) => {
      setIsEdit1On(false);
    });
  };

  const handleChangeEditUser = (event, property) => {
    setEditUserData({
      ...editUserData,
      emp: { ...editUserData.emp, [property]: event.target.value },
    });
  };

  const handleDeleteUser = () => {
    deleteEmployee(username).then((response) => {
      console.log(response);
      setIsLoggedIn(false);
    });
  };

  const handleChangeAddAddress = (event, property) => {
    setAddressToBeAdded({
      ...addressToBeAdded,
      [property]: event.target.value,
    });
  };

  const handleChangeAddAddress2 = (event, property) => {
    setAddressToBeAdded2({
      ...addressToBeAdded2,
      [property]: event.target.value,
    });
  };

  const handleAddAddress = () => {
    console.log(addressToBeAdded, username);
    addCurrentEmployeeAddress(username, addressToBeAdded).then((response) => {
      console.log(response);
      setIsAddCurrentAddressOn(true);
    });
  };

  const handleAddAddress2 = () => {
    addPermanentEmployeeAddress(username, addressToBeAdded2).then(
      (response) => {
        console.log(response);
        setIsAddPermanentAddressOn(true);
      }
    );
  };

  const handleEditCurrentAddressButton = () => {
    setIsEditCurrentAddressOn(true);
  };
  const handleEditPermanentAddressButton = () => {
    setIsEditPermanentAddressOn(true);
  };

  const handleDeleteCurrentAddressButton = (id) => {
    deleteEmployeeCurrentAddress(username, id).then((response) => {
      console.log(response);
      setIsCurrentAddressDeleted(true);
    });
  };
  const handleDeletePermanentAddressButton = (id) => {
    deleteEmployeePermanentAddress(username, id).then((response) => {
      console.log(response);
      setIsPermanentAddressDeleted(true);
    });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          // justifyContent: "center",
          backgroundColor: "#CBAACB",
          alignItems: "center",
          height: "200vh",
          display: isLoggedIn ? "inline-block" : "none",
        }}
      >
        {isLoggedIn && (
          <>
            {userData && !isEdit1On ? (
              <Card
                className="my-2 shadow-lg rounded"
                color="secondary"
                inverse
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "30rem",
                  height: "15rem",
                  border: "2px solid #ccc",
                  backgroundColor: "#f8f9fa",
                }}
              >
                <CardHeader
                  style={{
                    backgroundColor: "#343a40",
                    color: "#fff",
                    textAlign: "center",
                    fontSize: "1.25rem",
                  }}
                >
                  User Details
                </CardHeader>
                <CardBody>
                  <div>
                    {" "}
                    <strong>Name:</strong> {userData.emp.name}
                  </div>
                  <div>
                    {" "}
                    <strong>Age:</strong> {userData.emp.age}
                  </div>
                  <div>
                    {" "}
                    <strong>Salary:</strong> {userData.emp.salary}
                  </div>
                  <div>
                    <Button
                      color="primary"
                      onClick={(event) => handleIsEdit1(event)}
                    >
                      Edit
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ) : (
              ""
            )}

            {userData &&
            userData.emp.currentAddress &&
            !isEditCurrentAddressOn ? (
              <Card
                className="my-2 shadow-lg rounded"
                color="secondary"
                inverse
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "30rem",
                  height: "15rem",
                  border: "2px solid #ccc",
                  backgroundColor: "#f8f9fa",
                }}
              >
                <CardHeader
                  style={{
                    backgroundColor: "#343a40",
                    color: "#fff",
                    textAlign: "center",
                    fontSize: "1.25rem",
                  }}
                >
                  Current Address
                </CardHeader>
                <CardBody
                  style={{
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <strong>City:</strong>
                    <span style={{ marginLeft: "0.5rem" }}>
                      {userData.emp.currentAddress.city}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <strong>State:</strong>
                    <span style={{ marginLeft: "0.5rem" }}>
                      {userData.emp.currentAddress.state}
                    </span>
                  </div>
                  <div>
                    <Button
                      color="primary"
                      style={{
                        marginRight: "0.5rem",
                      }}
                      onClick={handleEditCurrentAddressButton}
                    >
                      Edit
                    </Button>
                    <Button
                      color="danger"
                      onClick={() =>
                        handleDeleteCurrentAddressButton(
                          userData.emp.currentAddress.id
                        )
                      }
                    >
                      Delete Address
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ) : (
              ""
            )}
            {userData && !userData.emp.currentAddress ? (
              <Card
                className="my-2"
                color="secondary"
                inverse
                style={{
                  width: "24rem",
                }}
              >
                <CardHeader>Add Current Address</CardHeader>

                <Form>
                  <FormGroup floating>
                    <Input
                      type="text"
                      id="city"
                      name="city"
                      value={addressToBeAdded.city}
                      onChange={(event) =>
                        handleChangeAddAddress(event, "city")
                      }
                    />
                    <Label htmlForm="city">City</Label>
                  </FormGroup>
                  <FormGroup floating>
                    <Input
                      type="text"
                      id="state"
                      name="state"
                      value={addressToBeAdded.state}
                      onChange={(event) =>
                        handleChangeAddAddress(event, "state")
                      }
                    />
                    <Label htmlForm="state">State</Label>
                  </FormGroup>
                  <Button onClick={handleAddAddress}>Save</Button>
                </Form>
              </Card>
            ) : (
              ""
            )}

            {isEditCurrentAddressOn ? (
              <EditCurrentAddressOn
                setIsEditCurrentAddress={setIsEditCurrentAddress}
                setIsEditCurrentAddressOn={setIsEditCurrentAddressOn}
                userData={userData}
              />
            ) : (
              ""
            )}

            {userData && !userData.emp.permanentAddress ? (
              <Card
                className="my-2"
                color="secondary"
                inverse
                style={{
                  width: "18rem",
                }}
              >
                <CardHeader>Add Permanent Address </CardHeader>
                <Form>
                  <FormGroup floating>
                    <Input
                      type="text"
                      id="city"
                      name="city"
                      value={addressToBeAdded2.city}
                      onChange={(event) =>
                        handleChangeAddAddress2(event, "city")
                      }
                    />
                    <Label htmlFor="city">City</Label>
                  </FormGroup>
                  <FormGroup floating>
                    <Input
                      type="text"
                      id="state"
                      name="state"
                      value={addressToBeAdded2.state}
                      onChange={(event) =>
                        handleChangeAddAddress2(event, "state")
                      }
                    />
                    <Label htmlFor="state">State</Label>
                  </FormGroup>
                  <Button onClick={handleAddAddress2}>Save</Button>
                </Form>
              </Card>
            ) : (
              ""
            )}

            {userData &&
            userData.emp.permanentAddress &&
            !isEditPermanentAddressOn ? (
              <Card
                className="my-2 shadow-lg rounded"
                color="secondary"
                inverse
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "30rem",
                  height: "15rem",
                  border: "2px solid #ccc",
                  backgroundColor: "#f8f9fa",
                }}
              >
                <CardHeader
                  style={{
                    backgroundColor: "#343a40",
                    color: "#fff",
                    textAlign: "center",
                    fontSize: "1.25rem",
                  }}
                >
                  Permanent Address
                </CardHeader>
                <CardBody
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: "0.25rem",
                    }}
                  >
                    <strong>City:</strong>
                    <span>{userData.emp.permanentAddress.city}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: "0.25rem",
                    }}
                  >
                    <strong>State:</strong>
                    <span>{userData.emp.permanentAddress.state}</span>
                  </div>
                  <div>
                    <Button
                      color="primary"
                      style={{
                        marginRight: "0.5rem",
                      }}
                      onClick={handleEditPermanentAddressButton}
                    >
                      Edit
                    </Button>
                    <Button
                      color="danger"
                      onClick={() =>
                        handleDeletePermanentAddressButton(
                          userData.emp.permanentAddress.id
                        )
                      }
                    >
                      Delete Address
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ) : (
              ""
            )}

            {isEditPermanentAddressOn && (
              <EditPermanentAddress
                setIsEditPermanentAddressOn={setIsEditPermanentAddressOn}
                setIsEditPermanentAddress={setIsEditPermanentAddress}
                userData={userData}
              />
            )}

            {editUserData && isEdit1On ? (
              <Card
                className="my-2"
                color="secondary"
                inverse
                style={{
                  width: "18rem",
                }}
              >
                <CardBody>
                  <CardText>
                    <Input
                      type="text"
                      id="age"
                      name="age"
                      value={editUserData.emp.age}
                      onChange={(event) => handleChangeEditUser(event, "age")}
                    />
                  </CardText>
                </CardBody>

                <CardBody>
                  <CardText>
                    <Input
                      type="text"
                      id="salary"
                      name="salary"
                      value={editUserData.emp.salary}
                      onChange={(event) =>
                        handleChangeEditUser(event, "salary")
                      }
                    />
                  </CardText>
                </CardBody>
                <Button onClick={handleSaveEdited}>Save</Button>
              </Card>
            ) : (
              ""
            )}

            <div
              style={{
                display: "flex",
                gap: "1rem",
              }}
            >
              <Button
                color="primary"
                style={{
                  padding: "0.5rem 1rem",
                  fontSize: "1rem",
                  borderRadius: "0.25rem",
                  boxShadow:
                    "0 10px 20px rgba(0, 0, 0, 0.5), 0 15px 40px rgba(0, 0, 0, 0.5)",
                  transform: "translateY(-2px)",
                  transition: "background-color 0.3s ease",
                }}
                onClick={handleLogout}
              >
                Log Out
              </Button>
              <Button
                color="danger"
                style={{
                  padding: "0.5rem 1rem",
                  fontSize: "1rem",
                  borderRadius: "0.25rem",
                  boxShadow:
                    "0 10px 20px rgba(0, 0, 0, 0.5), 0 15px 40px rgba(0, 0, 0, 0.5)",
                  transform: "translateY(-2px)",
                  transition: "background-color 0.3s ease",
                }}
                onClick={handleDeleteUser}
              >
                Delete Account
              </Button>
            </div>
          </>
        )}
      </div>
      {!isLoggedIn && <Login />}
    </>
  );
};
export default DisplayEmploye;
