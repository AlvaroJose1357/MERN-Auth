import axios from "./axios";

export const getTasksRequest = () => {
  return axios.get("/tareas");
};

export const getTaskRequest = (id) => {
  return axios.get(`/tareas/${id}`);
};

export const createTaskRequest = (task) => {
  return axios.post("/tareas", task);
};

export const updateTaskRequest = (task) => {
  return axios.put(`/tareas/${task._id}`, task);
};

export const deleteTaskRequest = (id) => {
  return axios.delete(`/tareas/${id}`);
};
