import React from "react";
import { useNavigate } from "react-router-dom";
import "./style/LoginPage.css";

function LoginPage() {
  const navigate = useNavigate(); // useNavigate 훅 추가

  return (
    <div className="login-page">
      <div className="form-container">
        <h1 className="welcome-text">Welcome!</h1>
        <p className="signin-text">Sign In</p>
        <form className="login-form">
          <input type="text" placeholder="Id" className="input-field" />
          <input type="password" placeholder="Password" className="input-field" />
          <div className="button-container">
            <button
              type="button"
              className="signin-button"
              onClick={() => navigate("/main")} // 버튼 클릭 시 SignInPage로 이동
            >
              sign in
            </button>
            <button
              type="button"
              className="signup-button"
              onClick={() => navigate("/signup")} // 버튼 클릭 시 MainPage로 이동
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
