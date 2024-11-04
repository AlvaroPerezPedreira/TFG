import React, { useEffect, useState } from "react";
import "./styles/bento.css";
import { startTransition } from "react";
import { useFiltersStore } from "../../../store/useFiltersStore";
import { calculateCheckInOut } from "../../../Functions/calendarFunctions";
import { useNavigate } from "react-router-dom";

export default function LodgeBento() {
  const { setFilters } = useFiltersStore();
  let navigate = useNavigate();

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const adults = 1;
  const children = 0;
  const rooms = 1;

  const handleClick = (country) => () => {
    setFilters({
      country,
      adults,
      children,
      rooms,
      checkIn,
      checkOut,
    });

    startTransition(() => {
      const queryParams = new URLSearchParams({
        checkIn,
        checkOut,
      });
      navigate(
        `/lodges/${encodeURIComponent(country)}?${queryParams.toString()}`
      );
    });
  };

  useEffect(() => {
    calculateCheckInOut({ setCheckIn, setCheckOut });
  }, []);

  return (
    <div id="bento-div" className="bt-div">
      <div
        className="bento-item bento-item-1"
        onClick={handleClick("United States of America")}
      >
        <img src="http://localhost:8080/images/bento/USABento.jpg" alt="" />
      </div>
      <div className="bento-item bento-item-2" onClick={handleClick("Italy")}>
        <img src="http://localhost:8080/images/bento/ItalyBento.jpg" alt="" />
      </div>
      <div
        className="bento-item bento-item-3"
        onClick={handleClick("United Kingdom")}
      >
        <img src="http://localhost:8080/images/bento/UKBento.jpg" alt="" />
      </div>
      <div className="bento-item bento-item-4" onClick={handleClick("France")}>
        <img src="http://localhost:8080/images/bento/FranceBento.jpg" alt="" />
      </div>
    </div>
  );
}
