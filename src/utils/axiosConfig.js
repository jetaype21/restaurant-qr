import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "https://qr-4mk9.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default axiosConfig;
