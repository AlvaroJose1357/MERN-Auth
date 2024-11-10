import { PORT } from "./src/config/entorno.js";
import app from "./src/config/express.js";
import connectDB from "./src/config/BD.js";

connectDB();

const PUERTO = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PUERTO}`);
});
