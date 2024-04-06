import React from "react";

const Register = () => {
  return (
    <div className="auth-wrap">
      <div className="auth-form">
        <h1>Register</h1>
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
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Repeat password"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Username"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Name"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Lastname"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Phone number"
            />
          </div>
          <div className="form-group">
            <label for="birthday">Birthday:</label>
            <input type="date" className="form-control" id="password" />
          </div>
          <div className="form-group">
            <label for="country">Country:</label>
          </div>
          <div className="form-group">
            <label for="genre">Genre:</label>
            <div className="checkbox-container">
              <div className="genre-checkbox">
                <label for="male">Male:</label>
                <input type="checkbox"></input>
              </div>
              <div className="genre-checkbox">
                <label for="female">Female:</label>
                <input type="checkbox"></input>
              </div>
              <div className="genre-checkbox">
                <label for="non-binary">non-binary:</label>
                <input type="checkbox"></input>
              </div>
            </div>
          </div>

          <button type="submit" className="auth-button">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
