import { Router } from "express";
import controllerAuth from "../controllers/controllerAuth.js";
import { authRequired } from "../middleware/middlewareAuth.js";
import { validatSchema } from "../middleware/middlewareValidator.js";
import validatorAuth from "../schemas/validatorAuth.js";

const router = Router();

router.post(
  "/register",
  validatSchema(validatorAuth.registerSchema),
  controllerAuth.register
);
router.post(
  "/login",
  validatSchema(validatorAuth.loginSchema),
  controllerAuth.login
);
router.post("/logout", controllerAuth.logout);
router.get("/verifyToken", controllerAuth.verifyToken);
router.get("/profile", authRequired, controllerAuth.profile);

export default router;
