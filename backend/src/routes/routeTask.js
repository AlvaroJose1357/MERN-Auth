import { Router } from "express";
import controllerTask from "../controllers/controllerTask.js";
import { authRequired } from "../middleware/middlewareAuth.js";
import { taskSchema } from "../schemas/validatorTask.js";
import { validatSchema } from "../middleware/middlewareValidator.js";

const router = Router();

router.get("/", authRequired, controllerTask.getTasks);
router.get("/:id", authRequired, controllerTask.getTaskbyId);
router.post(
  "/",
  authRequired,
  validatSchema(taskSchema),
  controllerTask.createTask
);
router.delete("/:id", authRequired, controllerTask.deleteTask);
router.put("/:id", authRequired, controllerTask.updateTask);

export default router;
