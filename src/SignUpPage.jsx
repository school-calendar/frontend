import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // axios를 직접 import
import "./style/SignUpPage.css";

function SignUpPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    school_name: "",
    grade: 0,
    class_num: 0,
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [id]: id === "grade" || id === "class_num" ? parseInt(value, 10) : value,
    }));
  };

  const handleSignUp = async () => {
    console.log({
      ...form,
      grade: Number(form.grade),
      class_num: Number(form.class_num),
      moderator: false,
      school_schedule_added: false,
    });

    try {
      const response = await axios.post("http://127.0.0.1:8000/user/signup", {
        ...form,
        grade: Number(form.grade), // 정수 변환
        class_num: Number(form.class_num), // 정수 변환
        moderator: false,
        school_schedule_added: false,
      });
      console.log("Sign-up response:", response.data);
      alert("Sign-up successful!");
      setForm({
        username: "",
        password: "",
        school_name: "",
        grade: 0,
        class_num: 0,
      });
      navigate("/");
    } catch (error) {
      console.error("Sign-up failed:", error.response?.data || error.message);
      alert(
        error.response?.data?.detail || "Error signing up. Please try again."
      );
    }
  };

  return (
    <div className="signin-page">
      <div className="form-container">
        <h1 className="signin-header">Sign Up</h1>
        <form className="signin-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Id"
            className="input-field"
            id="username"
            value={form.username}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            id="password"
            value={form.password}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="School Name"
            className="input-field"
            id="school_name"
            value={form.school_name}
            onChange={handleInputChange}
          />
          <input
            type="number"
            placeholder="Grade"
            className="input-field"
            id="grade"
            value={form.grade}
            onChange={handleInputChange}
          />
          <input
            type="number"
            placeholder="Class"
            className="input-field"
            id="class_num"
            value={form.class_num}
            onChange={handleInputChange}
          />
          <div className="button-container">
            <button type="button" className="signup-button" onClick={handleSignUp}>
              sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
