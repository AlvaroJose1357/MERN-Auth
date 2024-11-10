import dotenv from "dotenv";
import moongose from "mongoose";

dotenv.config();

const connectDB = async () => {
  try {
    await moongose.connect(process.env.MONGO_URL);
    console.log("Conexión a la base de datos exitosa");
  } catch (error) {
    console.error("Error de conexión a la base de datos");
    process.exit(1);
  }
};

export default connectDB;
