import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000", // 백엔드 주소
  headers: {
    "Content-Type": `application/json;charset=UTF-8`,
    "Accept": "application/json",
  
    // 추가  
    "Access-Control-Allow-Origin": `http://localhost:5173`,
    'Access-Control-Allow-Credentials':"true",
}
});

export default api;
