import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import UpdateProfile from "./components/User/UpdateProfile";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { authUser } = useAuthContext();

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={!authUser ? <Navigate to="/login" /> : <Home />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={authUser ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/updateProfile" element={<UpdateProfile />} />
      </Routes>
    </>
  );
}

export default App;
