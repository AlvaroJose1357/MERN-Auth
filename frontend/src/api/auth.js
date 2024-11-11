import axios from "axios";

const API_URL = "http://localhost:3000/api/autenticacion";

export const registerRequest = (user) => {
  return axios.post(`${API_URL}/register`, user);
};

export const loginRequest = (user) => {
  return axios.post(`${API_URL}/login`, user);
};
