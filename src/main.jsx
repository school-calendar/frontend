import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'; // 전역 CSS 파일 (필요에 따라 유지)
import App from './App'; // App 컴포넌트를 임포트

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
