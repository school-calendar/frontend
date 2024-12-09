import React from "react";
import { useNavigate } from "react-router-dom";
import "./style/LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/main");
  };

  return (
    <div className="container">
      <main className="main">
        <div className="content">
          <h1 className="title">School Calendar</h1>
          <p className="subtitle">학사일정과 수행평가 관리를 도와주는 캘린더</p>
          <button className="button" onClick={handleStart}>
            시작하기
          </button>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
