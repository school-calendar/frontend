import React from "react";
import "./style/SignUpPage.css";

function SignInPage() {
  return (
    <div className="signin-page">
      <div className="form-container">
        <h1 className="signin-header">Sign Up</h1>
        <form className="signin-form">
          <div className="input-container">
            <input type="text" placeholder=" " className="input-field" id="id" />
            <label htmlFor="id" className="input-label">Id</label>
          </div>
          <div className="input-container">
            <input type="password" placeholder=" " className="input-field" id="password" />
            <label htmlFor="password" className="input-label">Password</label>
          </div>
          <div className="input-container">
            <input type="text" placeholder=" " className="input-field" id="grade" />
            <label htmlFor="grade" className="input-label">Grade</label>
          </div>
          <div className="input-container">
            <input type="text" placeholder=" " className="input-field" id="class" />
            <label htmlFor="class" className="input-label">Class</label>
          </div>
          <div className="button-container">
            <button type="button" className="signin-button">sign in</button>
            <button type="button" className="signup-button">sign up</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignInPage;
