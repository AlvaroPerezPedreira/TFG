import "./styles/mybookings.css";
import React, { startTransition, Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AppNavbar from "../AppNavbar";
import useBookings from "../../hooks/useBookings";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../../context/ThemeContext";
import MyBookingCard from "./BookingComponents/MyBookingCard";
import toast, { Toaster } from "react-hot-toast";

function MyBookings() {
  const [t] = useTranslation(["booking"]);
  let navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const { getMyBookings } = useBookings();
  const token = JSON.parse(localStorage.getItem("authUser")).serviceToken;
  const { color } = useThemeContext();

  useEffect(() => {
    getMyBookings({ token, setBookings });
  }, []);

  console.log(bookings);

  return (
    <Suspense fallback="loading">
      <Toaster position="top-center" reverseOrder={false} />
      <AppNavbar />
      <div className="myBookings-container">
        <div className="myBookings-titleContainer">
          <span className="myBookings-title">{t("myBookingsTitle")}</span>
        </div>
        {bookings.length === 0 && (
          <div className="myBookings-noBookings">
            <span>{t("noBookings")}</span>
          </div>
        )}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {Array.isArray(bookings) &&
            bookings.map((booking, index) => (
              <MyBookingCard key={index} booking={booking} />
            ))}
        </div>
      </div>
    </Suspense>
  );
}

export default MyBookings;
