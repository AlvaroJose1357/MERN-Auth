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

export const updateTaskRequest = (id, task) => {
  return axios.put(`/tareas/${id}`, task);
};

export const deleteTaskRequest = (id) => {
  return axios.delete(`/tareas/${id}`);
};
