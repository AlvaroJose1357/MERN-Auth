import axios from "axios";

const API_URL = "http://localhost:3000/api/autenticacion";

export const registerRequest = (user) => {
  return axios.post(`${API_URL}/register`, user);
};
