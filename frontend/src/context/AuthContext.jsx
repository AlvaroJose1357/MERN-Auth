/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import { registerRequest } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [error, setErrors] = useState([]);

  const signup = async (data) => {
    try {
      const res = await registerRequest(data);
      // esta es toda la respuesta
      console.log(res);
      // entrando a data
      console.log(res.data);
      // como en el backend estoy devolviendo un array con success y con esta propiedad entonces es aqui a donde debemos acceder
      console.log(res.data.userSaved);
      setUser(res.data.userSaved);
      setIsAuth(true);

      // si quisieramos que esos datos quedaran solo dentro de la data tendriamos que modificar el backend eliminando el contenido del array y modificandolo por solo los datos de user
    } catch (error) {
      // console.error(error.response);
      // console.error(error.response.data);
      setErrors(error.response.data);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signup, isAuth, error }}>
      {children}
    </AuthContext.Provider>
  );
};
