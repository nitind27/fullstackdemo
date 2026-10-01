import axios from "axios";

const API_BASE = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

export const getUsers   = ()         => api.get("/users");
export const getUser    = (id)       => api.get(`/users/${id}`);
export const createUser = (data)     => api.post("/users", data);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);
export const deleteUser = (id)       => api.delete(`/users/${id}`);
