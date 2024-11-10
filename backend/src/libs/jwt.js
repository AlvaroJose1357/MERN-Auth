import { JWT_SECRET } from "../config/entorno.js";

import jwt from "jsonwebtoken";

export function createAcessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
}
