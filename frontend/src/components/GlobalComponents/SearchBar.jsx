import "../styles/searchbar.css";
import React, { startTransition, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import SearchIcon from "../../icons/SearchIcon";
import { Button } from "@nextui-org/button";
import { DatePicker } from "@nextui-org/date-picker";
import { Input } from "@nextui-org/input";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [t] = useTranslation(["searchBar"]);
  const whereRef = useRef(null);
  const adultsRef = useRef(null);
  const roomsRef = useRef(null);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [error, setError] = useState(""); // Solo un mensaje de error genérico
  let navigate = useNavigate();

  const handleDateChange = (date, type) => {
    const jsDate = new Date(date);

    const day = String(jsDate.getDate()).padStart(2, "0");
    const month = String(jsDate.getMonth() + 1).padStart(2, "0");
    const year = jsDate.getFullYear();

    // Formatear la fecha en el formato "YYYY-MM-DD"
    const formattedDate = `${year}-${month}-${day}`;

    if (type === "checkIn") {
      setCheckIn(formattedDate);
    } else {
      setCheckOut(formattedDate);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const where = whereRef.current.value;
    const adults = adultsRef.current.value;
    const rooms = roomsRef.current.value;

    if (!where || !adults || !rooms || !checkIn || !checkOut) {
      setError(t("searchbarError")); // Mensaje de error genérico
      return;
    }

    if (isNaN(adults) || adults <= 0) {
      setError(t("searchbarErrorAdults"));
      return;
    }
    if (isNaN(rooms) || rooms <= 0) {
      setError(t("searchbarErrorRooms"));
      return;
    }

    if (checkIn > checkOut) {
      setError(t("searchbarErrorDates"));
      return;
    }

    setError("");
    console.log({ where, adults, rooms, checkIn, checkOut });

    startTransition(() => {
      navigate(`/lodges/${encodeURIComponent(where)}`, {
        state: { adults, rooms, checkIn, checkOut },
      });
    });
  };

  return (
    <>
      <form className="searchbar-container" onSubmit={handleSubmit}>
        <div className="searchbar-inputs">
          <Input
            label={t("where")}
            placeholder={t("where_ph")}
            ref={whereRef}
            variant="bordered"
          />
          <Input
            label={t("adults")}
            placeholder={t("adults_ph")}
            ref={adultsRef}
            variant="bordered"
          />
          <Input
            label={t("rooms")}
            placeholder={t("rooms_ph")}
            ref={roomsRef}
            variant="bordered"
          />
          <DatePicker
            label={t("check-in")}
            visibleMonths={1}
            variant="bordered"
            onChange={(date) => handleDateChange(date, "checkIn")}
          />
          <DatePicker
            label={t("check-out")}
            visibleMonths={1}
            variant="bordered"
            onChange={(date) => handleDateChange(date, "checkOut")}
          />
        </div>
        <div className="searchbar-button-container">
          <Button className="searchbar-button" isIconOnly type="submit">
            <SearchIcon />
          </Button>
        </div>
      </form>
      <div className="error-messages">
        {error && (
          <div className="error-container">
            <span className="error">{error}</span>
          </div>
        )}
      </div>
    </>
  );
}
