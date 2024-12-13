import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import UpdateProfile from "./components/User/UpdateProfile";
import { useAuthContext } from "./context/AuthContext";
import ChangePassword from "./components/User/ChangePassword";
import UserDetails from "./components/User/UserDetails";
import TestPage from "./components/TestPage";
import LodgeDetails from "./components/Lodge/LodgeDetails";
import LodgeApiDetails from "./components/Lodge/LodgeApiDetails";
import LodgeSearch from "./components/Lodge/LodgeSearch";
import ContactUs from "./components/ContactUs";
import CreateLodge from "./components/Lodge/CreateLodge";
import Search from "./components/Search";
import BannedUsers from "./components/User/BannedUsers";
import MyLodges from "./components/Lodge/MyLodges";
import BannedLodges from "./components/Lodge/BannedLodges";
import UpdateLodge from "./components/Lodge/UpdateLodge";
import AboutUs from "./components/AboutUs";
import Policy from "./components/Policy";
import MyBookings from "./components/Booking/MyBookings";

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
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/users/:email" element={<UserDetails />} />
        <Route path="/lodge/:email" element={<LodgeDetails />} />
        <Route path="/lodgeApi/:email" element={<LodgeApiDetails />} />
        <Route path="/lodges/:destination" element={<LodgeSearch />} />
        <Route path="/lodge/createLodge" element={<CreateLodge />} />
        <Route path="/searchLodges" element={<Search />} />
        <Route path="/users/bannedUsers" element={<BannedUsers />} />
        <Route path="/lodge/myLodges" element={<MyLodges />} />
        <Route path="/lodge/updateLodge/:email" element={<UpdateLodge />} />
        <Route path="/lodges/bannedLodges" element={<BannedLodges />} />
        <Route path="/bookings/myBookings" element={<MyBookings />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </>
  );
}

export default App;
