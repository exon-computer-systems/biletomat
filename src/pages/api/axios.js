import axios from "axios";
const BASE_URL = "https://biletomat-be.onrender.com";
// const BASE_URL = "https://localhost:3500";
// const BASE_URL = "http://localhost:3500";

export default axios.create({
    // baseURL: "https://biletomat-be.onrender.com",
    baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
    // baseURL: "https://biletomat-be.onrender.com",
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});
