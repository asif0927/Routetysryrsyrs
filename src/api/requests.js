import axios from "axios";
import { BASE_URL } from "./base_url";

export const getAllEmployees = async () => {
  let globalData;
  await axios
    .get(`${BASE_URL}/employees`)
    .then((res) => {
      globalData = res.data;
    });
  return globalData;
};

export const getEmployeesByID = async (id) => {
  let globalData;
  await axios
    .get(`${BASE_URL}/employees/${id}`)
    .then((res) => {
      globalData = res.data;
    });
  return globalData;
};

export const postEmployee = (payload) => {
   axios.post(`${BASE_URL}/employees`, payload);
};

export const putEmployees = (id, updatedProduct) => {
  return axios.put(`${BASE_URL}/employees/${id}`, updatedProduct);
};

export const deleteEmployeesByID = (id) => {
  return axios.delete(`${BASE_URL}/employees/${id}`);
};
