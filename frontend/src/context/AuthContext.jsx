/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [error, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const signin = async (data) => {
    try {
      const res = await loginRequest(data);
      console.log(res);
      setUser(res.data.userSaved);
      setIsAuth(true);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  useEffect(() => {
    if (error.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    async function checklogin() {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuth(false);
        setLoading(false);
        setUser(null);
        return;
      }
      try {
        const res = await verifyTokenRequest(cookies.token);
        console.log(res);
        if (!res.data) {
          setIsAuth(false);
          setLoading(false);
          return;
        }

        setUser(res.data);
        setIsAuth(true);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setIsAuth(false);
        setUser(null);
        setLoading(false);
      }
    }
    checklogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signup, signin, isAuth, error, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
