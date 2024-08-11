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
import { updateEmployeeAddress } from "../Services/user-service";

export default function EditCurrentAddressOn(props) {
  var username = Cookies.get("username");

  const [addressToBeEdited, setAddressToBeEdited] = useState({
    city: props.userData.emp.currentAddress.city,
    state: props.userData.emp.currentAddress.state,
  });
  const handleChangeEditCurrentAddress = (event, property) => {
    setAddressToBeEdited({
      ...addressToBeEdited,
      [property]: event.target.value,
    });
  };
  const handleSaveEditedCurrentAddress = (id) => {
    updateEmployeeAddress(username, id, addressToBeEdited).then((response) => {
      console.log(response);
      props.setIsEditCurrentAddressOn(false);
      props.setIsEditCurrentAddress(true);
    });
  };
  const handleEditCurrentAddressCancelButton = () => {
    props.setIsEditCurrentAddressOn(false);
  };

  return (
    <div>
      <Card
        className="my-2"
        color="secondary"
        inverse
        style={{
          width: "18rem",
        }}
      >
        <CardHeader>Edit Current Address</CardHeader>

        <Form>
          <FormGroup floating>
            <Input
              type="text"
              id="city"
              name="city"
              onChange={(event) =>
                handleChangeEditCurrentAddress(event, "city")
              }
              value={addressToBeEdited.city}
            />
            <Label htmlFor="city">City</Label>
          </FormGroup>
          <FormGroup floating>
            <Input
              type="text"
              id="state"
              name="state"
              onChange={(event) =>
                handleChangeEditCurrentAddress(event, "state")
              }
              value={addressToBeEdited.state}
            />
            <Label htmlFor="state">State</Label>
          </FormGroup>
          <Button
            color="primary"
            style={{
              marginRight: "0.5rem",
            }}
            onClick={(event) =>
              handleSaveEditedCurrentAddress(
                props.userData.emp.currentAddress.id
              )
            }
          >
            Save
          </Button>
          <Button onClick={handleEditCurrentAddressCancelButton} color="info">
            Cancel
          </Button>
        </Form>
      </Card>
    </div>
  );
}
