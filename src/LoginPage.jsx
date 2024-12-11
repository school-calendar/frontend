import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style/LoginPage.css";
import api from "./utils/api";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.get(
        `/user/signin?username=${username}&password=${password}`
      );
      const token = response.data.token;
      localStorage.setItem("token", token); // JWT 토큰 저장
      navigate("/main");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid credentials. Please try again.");
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
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="button-container">
            <button
              type="button"
              className="signin-button"
              onClick={handleLogin}
            >
              sign in
            </button>
            <button
              type="button"
              className="signup-button"
              onClick={() => navigate("/signup")}
            >
              sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;