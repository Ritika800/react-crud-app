import axios from "axios";

// Create an Axios instance for Employee CRUD operations
const employeeAxiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json"
  }
});