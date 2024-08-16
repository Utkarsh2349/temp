import React, { useState } from "react";
import Cookies from "js-cookie";
import {
  Button,
  Card,
  CardHeader,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { addPermanentEmployeeAddress } from "../Services/user-service";
export default function AddPermanentAddress(props) {
  var username = Cookies.get("username");
  const [addressToBeAdded2, setAddressToBeAdded2] = useState({
    city: "",
    state: "",
    street:"",
    pincode:""
  });
  const handleChangeAddAddress2 = (event, property) => {
    setAddressToBeAdded2({
      ...addressToBeAdded2,
      [property]: event.target.value,
    });
  };
  const handleAddAddress2 = () => {
    addPermanentEmployeeAddress(username, addressToBeAdded2).then(
      (response) => {
        console.log(response);
        props.setIsAddPermanentAddressOn(true);
      }
    );
  };
  return (
    <div>
      <Card
        className="my-2 shadow-lg rounded"
        color="secondary"
        inverse
        style={{
          display: "flex",
          flexDirection: "column",
          width: "30rem",
          height: "25rem",
          border: "2px solid #ccc",
          backgroundColor: "#f8f9fa",
        }}
      >
        <CardHeader>Add Permanent Address </CardHeader>
        <Form>
        <FormGroup floating>
            <Input
              type="text"
              id="street"
              name="street"
              value={addressToBeAdded2.street}
              onChange={(event) => handleChangeAddAddress2(event, "street")}
            />
            <Label htmlFor="street">Street</Label>
          </FormGroup>
          <FormGroup floating>
            <Input
              type="text"
              id="pincode"
              name="pincode"
              value={addressToBeAdded2.pincode}
              onChange={(event) => handleChangeAddAddress2(event, "pincode")}
            />
            <Label htmlFor="pincode">Pincode</Label>
          </FormGroup>
          <FormGroup floating>
            <Input
              type="text"
              id="city"
              name="city"
              value={addressToBeAdded2.city}
              onChange={(event) => handleChangeAddAddress2(event, "city")}
            />
            <Label htmlFor="city">City</Label>
          </FormGroup>
          <FormGroup floating>
            <Input
              type="text"
              id="state"
              name="state"
              value={addressToBeAdded2.state}
              onChange={(event) => handleChangeAddAddress2(event, "state")}
            />
            <Label htmlFor="state">State</Label>
          </FormGroup>
          <Button onClick={handleAddAddress2}>Save</Button>
        </Form>
      </Card>
    </div>
  );
}
