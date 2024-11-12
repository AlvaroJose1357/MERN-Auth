import Task from "../models/modelTask.js";

const getTasks = async (req, res) => {
  try {
    // lo que hace el populate es traer los datos del usuario que corresponde a la tarea haciendo asi como una relacion entre las tablas
    // si no se tubiera el populate solo traeria el id del usuario que corresponde a la tarea
    const tasks = await Task.find({ user: req.user.id }).populate("user");
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTaskbyId = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Task not found" });
  }
};

const createTask = async (req, res) => {
  const { title, description, date } = req.body;
  try {
    const newTask = new Task({ title, description, date, user: req.user.id });
    await newTask.save();
    res
      .status(201)
      .json({ message: "Task created successfully", newTask: { newTask } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskDeleted = await Task.findByIdAndDelete(req.params.id);
    if (!taskDeleted) {
      return res.status(404).json({ message: "Task not found" });
    }
    // res.status(200).json({
    //   message: "Task deleted successfully",
    //   taskDelete: { taskDeleted },
    // });
    return res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  // const { title, description, date } = req.body;
  try {
    const taskUpdated = await Task.findByIdAndUpdate(
      req.params.id,
      // {
      //   title,
      //   description,
      //   date,
      // },
      req.body,
      { new: true }
    );
    if (!taskUpdated) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({
      message: "Task updated successfully",
      taskUpdate: { taskUpdated },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const controllerTask = {
  getTasks,
  getTaskbyId,
  createTask,
  deleteTask,
  updateTask,
};

export default controllerTask;
