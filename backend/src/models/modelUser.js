import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
  },
  // el segundo argumento es un objeto de configuración
  // timestamps: true nos permite tener un campo para la fecha de creación y otro para la fecha de actualización de los documentos las cuales se llaman createdAt y updatedAt respectivamente y se crean automáticamente
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
