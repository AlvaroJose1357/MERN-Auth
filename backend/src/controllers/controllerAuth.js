import User from "../models/modelUser.js";
import bcrypt from "bcryptjs";
import { createAcessToken } from "../libs/jwt.js";

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Validar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    // Si el usuario ya existe
    if (existingUser) {
      return res.status(400).json(["El correo ya esta en uso"]);
    }
    // proceso de encriptación de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    // proceso de registro
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // generando el token
    const token = await createAcessToken({ id: newUser._id });
    res.cookie("token", token);
    // res.status(200).json({
    //   success: true,
    //   message: "Usuario registrado con exito",
    // });

    // devolviendo todo el objeto del usuario registrado incluye el id, nombre de usuario, correo, contraseña encriptada, fecha de creación y fecha de actualización
    // res.status(201).json({ success: true, userSaved: newUser });
    // devolviendo solo el id, nombre de usuario y correo del usuario registrado
    res.status(201).json({
      success: true,
      userSaved: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validar si el usuario ya existe
    const userFound = await User.findOne({ email });
    // Si el usuario ya existe
    if (!userFound) {
      return res.status(400).json({ message: "usuario no encontrado" });
    }
    // proceso de comparacion de la contraseña
    const passwordCorrect = await bcrypt.compare(password, userFound.password);
    // Si la contraseña es incorrecta
    if (!passwordCorrect) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // generando el token
    const token = await createAcessToken({ id: userFound._id });
    res.cookie("token", token);

    res.status(201).json({
      success: true,
      userSaved: {
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Sesión cerrada" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const profile = async (req, res) => {
  console.log(req.user);
  try {
    const userFound = await User.findById(req.user.id);
    if (!userFound) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ success: true, userFound });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const controllerAuth = {
  register,
  login,
  logout,
  profile,
};

export default controllerAuth;
