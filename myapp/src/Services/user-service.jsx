import { myAxois } from "./helper";

export const register = (employee) => {
  return myAxois.post("/register", employee).then((response) => response.data);
};

export const login = (loginn) => {
  return myAxois.post("/login", loginn).then((response) => response.data);
};

export const getEmployee = (username) => {
  return myAxois
    .get("/getEmployee", { params: { username: username } })
    .then((response) => response.data);
};

export const updateEmployee = (username, updatedata) => {
  return myAxois
    .put("/updateEmployee", updatedata, { params: { username: username } })
    .then((response) => response.data);
};
export const deleteEmployee = (username) => {
  return myAxois
    .delete("/deleteEmployee", { params: { username: username } })
    .then((response) => response.data);
};

export const addCurrentEmployeeAddress = (username, address) => {
  return myAxois
    .post("/addCurrentEmployeeAddress", {
      username: username,
      addressDTO: address,
    })
    .then((response) => response.data);
};

export const deleteEmployeeCurrentAddress = (username, id) => {
  return myAxois
    .delete("/deleteEmployeeCurrentAddress", { params: { username, id } })
    .then((response) => response.data);
};

export const addPermanentEmployeeAddress = (username, address) => {
  return myAxois
    .post("/addPermanentEmployeeAddress", {
      username: username,
      addressDTO: address,
    })
    .then((response) => response.data);
};

export const deleteEmployeePermanentAddress = (username, id) => {
  return myAxois
    .delete("/deleteEmployeePermanentAddress", { params: { username, id } })
    .then((response) => response.data);
};

export const updateEmployeeAddress = (username, id, address) => {
  return myAxois
    .put("/updateEmployeeAddress", address,{ params: { username, id } })
    .then((response) => response.data);
};
