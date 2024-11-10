import express from "express";
import morgan from "morgan";
import routesAuth from "../routes/routeAuth.js";
import routesTask from "../routes/routeTask.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
// si deseo que cualquier origen pueda acceder a mi API, debo configurar cors de la siguiente manera
app.use(cors());
// si deseo que solo un origen específico pueda acceder a mi API, debo configurar cors de la siguiente manera
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//   })
// );
// morgan es un middleware que nos permite ver en consola las peticiones que llegan al servidor en tiempo real
// morgan("dev") es una configuración de morgan que nos permite ver las peticiones en consola de una forma más legible
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api/autenticacion", routesAuth);
app.use("/api/tareas", routesTask);

export default app;
