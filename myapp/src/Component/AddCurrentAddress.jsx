import React, { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import Cookies from "js-cookie";
import { addCurrentEmployeeAddress } from "../Services/user-service";
export default function AddCurrentAddress(props) {
  var username = Cookies.get("username");
  const [addressToBeAdded, setAddressToBeAdded] = useState({
    city: "",
    state: "",
    street:"",
    pincode:""
  });
  const handleChangeAddAddress = (event, property) => {
    setAddressToBeAdded({
      ...addressToBeAdded,
      [property]: event.target.value,
    });
  };
  const handleAddAddress = () => {
    console.log(addressToBeAdded, username);
    addCurrentEmployeeAddress(username, addressToBeAdded).then((response) => {
      console.log(response);
      props.setIsAddCurrentAddressOn(true);
    });
  };
  return (
    <div>
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
              id="street"
              name="street"
              value={addressToBeAdded.street}
              onChange={(event) => handleChangeAddAddress(event, "street")}
            />
            <Label htmlForm="street">Street</Label>
          </FormGroup>
          <FormGroup floating>
            <Input
              type="text"
              id="pincode"
              name="pincode"
              value={addressToBeAdded.pincode}
              onChange={(event) => handleChangeAddAddress(event, "pincode")}
            />
            <Label htmlForm="pincode">Pincode</Label>
          </FormGroup>
          <FormGroup floating>
            <Input
              type="text"
              id="city"
              name="city"
              value={addressToBeAdded.city}
              onChange={(event) => handleChangeAddAddress(event, "city")}
            />
            <Label htmlForm="city">City</Label>
          </FormGroup>
          <FormGroup floating>
            <Input
              type="text"
              id="state"
              name="state"
              value={addressToBeAdded.state}
              onChange={(event) => handleChangeAddAddress(event, "state")}
            />
            <Label htmlForm="state">State</Label>
          </FormGroup>
          <Button onClick={handleAddAddress}>Save</Button>
        </Form>
      </Card>
    </div>
  );
}
