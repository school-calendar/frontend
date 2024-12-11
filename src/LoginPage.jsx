import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import jwt_decode from "jwt-decode";
import "./style/LoginPage.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("Entered credentials:", { username, password }); // 입력된 값 확인
    if (!username || !password) {
      console.error("Username or password is missing!");
      alert("Please enter both username and password.");
      return;
    }

    try {
      console.log("Attempting to send request to server...");
      const response = await axios.get(
        `http://127.0.0.1:8000/user/signin?username=${username}&password=${password}`
      );
      console.log("Response received from server:", response); // 서버 응답 전체 출력
      console.log("JWT Token:", response.data); // 서버에서 반환된 JWT 토큰 출력

      // JWT 디코딩
      const decodedToken = jwt_decode(response.data);
      console.log("Decoded JWT token:", decodedToken);

      // user_id 추출
      const userId = decodedToken.sub; // JWT payload에서 sub로 user_id 전달
      if (!userId) {
        console.error("JWT does not contain user_id!");
        alert("Invalid token received from server.");
        return;
      }

      console.log("Extracted user_id:", userId);

      console.log("Saving user data to localStorage...");
      localStorage.setItem("user_id", userId); // user_id 저장
      localStorage.setItem("username", username); // username 저장 (필요 시)

      alert("Login successful!");
      navigate("/main"); // 로그인 성공 시 메인 페이지로 이동
    } catch (error) {
      if (error.response) {
        console.error("Server responded with an error:", error.response.data); // 서버 오류 응답 확인
        alert(`Login failed: ${error.response.data.detail || "Unknown error"}`);
      } else if (error.request) {
        console.error("No response received from server. Possible network error:", error.request);
        alert("Failed to connect to server. Please check your network.");
      } else {
        console.error("Error setting up the request:", error.message);
        alert("An error occurred while attempting to log in.");
      }
    }
  };

  return (
    <div className="login-page">
      <div className="form-container">
        <h1 className="welcome-text">Welcome!</h1>
        <p className="signin-text">Sign In</p>
        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Id"
            className="input-field"
            value={username}
            onChange={(e) => {
              console.log("Username input changed:", e.target.value); // 입력 변경 로그
              setUsername(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => {
              console.log("Password input changed:", e.target.value); // 입력 변경 로그
              setPassword(e.target.value);
            }}
          />
          <div className="button-container">
            <button
              type="button"
              className="signin-button"
              onClick={handleLogin}
            >
              Sign In
            </button>
            <button
              type="button"
              className="signup-button"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
