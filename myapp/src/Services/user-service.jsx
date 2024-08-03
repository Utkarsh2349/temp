import { myAxois } from "./helper";

export const register = (employee) => {
  return myAxois.post("/register", employee).then((response) => response.data);
};

export const login = (login) => {
  return myAxois.post("/login", login).then((response) => response.data);
};
