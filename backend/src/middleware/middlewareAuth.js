import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/entorno.js";

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;
  // console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Acceso denegado" });
  }
  jwt.verify(token, JWT_SECRET, (error, user) => {
    if (error) {
      return res.status(403).json({ message: "Token no válido" });
    }
    req.user = user;
  });

  next();
};
