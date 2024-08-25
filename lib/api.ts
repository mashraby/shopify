import axios, { AxiosInstance } from "axios";

const ApiInstance: AxiosInstance = axios.create({
  //   baseURL: "https://fakestoreapi.com",
  baseURL: "https://fakestoreapi.in/api",
  timeout: 5000,
});

export default ApiInstance;
