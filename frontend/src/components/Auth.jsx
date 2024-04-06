import React from "react";
import "./styles/auth.css";

const Auth = () => {
  return (
    <div className="auth-wrap">
      <div className="auth-form login-form">
        <h1>Login</h1>
        <form>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="auth-button">
            Access booking
          </button>
          <a href="/register" className="register-link">
            Register
          </a>
        </form>
      </div>
    </div>
  );
};

export default Auth;
