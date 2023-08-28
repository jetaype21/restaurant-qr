import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "https://back-qr.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default axiosConfig;
