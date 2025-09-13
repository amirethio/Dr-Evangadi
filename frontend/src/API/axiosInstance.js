import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dr-evangadi-backend.onrender.com",
});

export default axiosInstance;
