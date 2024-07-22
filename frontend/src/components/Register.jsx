import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Register = () => {
  const [birthdate, setBirthdate] = useState("");
  const [activeLabel, setActiveLabel] = useState("");
  const [activeCheckbox, setActiveCheckbox] = useState(null);
  let navigate = useNavigate();
  const { setAuthUser } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      email: form.get("email"),
      password: form.get("password"),
      repeat_password: form.get("repeat_password"),
      username: form.get("username"),
      name: form.get("name"),
      lastname: form.get("lastname"),
      phone: form.get("phone"),
      birthdate: birthdate,
      country: "ESPAÑA!",
      genre: activeLabel,
      address: form.get("address"),
      passport: form.get("passport"),
    };

    const response = await fetch("http://localhost:8080/api/users/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    });

    const finalData = await response.json();
    console.log(finalData);

    localStorage.setItem("authUser", JSON.stringify(finalData));
    setAuthUser(finalData);

    navigate("/");
  };

  const handleDateChange = (e) => {
    setBirthdate(e.target.value);
  };

  const handleChangeCheckbox = (label, id) => {
    setActiveLabel(label);
    setActiveCheckbox(id);
  };

  return (
    <div className="auth-wrap">
      <div className="auth-image" />
      <div className="auth-form">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Email"
              name="email"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Repeat password"
              name="repeat_password"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              name="username"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              name="name"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Lastname"
              name="lastname"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Phone number"
              name="phone"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Address"
              name="address"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Passport number"
              name="passport"
            />
          </div>
          <div className="form-group">
            <label htmlFor="birthdate">Birthdate:</label>
            <input
              type="date"
              className="form-control"
              value={birthdate}
              onChange={handleDateChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="country">Country:</label>
          </div>
          <div className="form-group">
            <label htmlFor="genre">Genre:</label>
            <div className="checkbox-container">
              <div className="genre-checkbox">
                <label htmlFor="male">Male:</label>
                <input
                  type="checkbox"
                  id="male"
                  checked={activeCheckbox === "male"}
                  onChange={() => handleChangeCheckbox("male", "male")}
                ></input>
              </div>
              <div className="genre-checkbox">
                <label htmlFor="female">Female:</label>
                <input
                  type="checkbox"
                  id="female"
                  checked={activeCheckbox === "female"}
                  onChange={() => handleChangeCheckbox("female", "female")}
                ></input>
              </div>
              <div className="genre-checkbox">
                <label htmlFor="non-binary">non-binary:</label>
                <input
                  type="checkbox"
                  id="non-binary"
                  checked={activeCheckbox === "non-binary"}
                  onChange={() =>
                    handleChangeCheckbox("non-binary", "non-binary")
                  }
                ></input>
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
