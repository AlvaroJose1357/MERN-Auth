/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import {
  createTaskRequest,
  deleteTaskRequest,
  getTasksRequest,
  updateTaskRequest,
} from "../api/task";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [error, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
    setLoading(false);
  };

  const createTask = async (data) => {
    try {
      const res = await createTaskRequest(data);
      setTasks([...tasks, res.data]);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const updateTask = async (data) => {
    try {
      const res = await updateTaskRequest(data);
      const newTasks = tasks.map((task) => {
        if (task._id === res.data._id) {
          return res.data;
        }
        return task;
      });
      setTasks(newTasks);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteTaskRequest(id);
      const taskDelete = tasks.filter((task) => task._id !== id);
      setTasks(taskDelete);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    if (error.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        error,
        loading,
        getTasks,
        createTask,
        updateTask,
        deleteTask,
      }}>
      {children}
    </TaskContext.Provider>
  );
};
