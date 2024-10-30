import "../styles/searchbar.css";
import React, { startTransition, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import SearchIcon from "../../icons/SearchIcon";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useNavigate } from "react-router-dom";
import { DateRangePicker } from "@nextui-org/date-picker";
import { useFiltersStore } from "../../store/useFiltersStore";
import { handleDateChange } from "../../Functions/calendarFunctions";

export default function SearchBar() {
  const [t] = useTranslation(["searchBar"]);
  const whereRef = useRef(null);
  const adultsRef = useRef(null);
  const childrenRef = useRef(null);
  const roomsRef = useRef(null);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [error, setError] = useState("");
  let navigate = useNavigate();
  const { setFilters } = useFiltersStore();

  const handleDateChangeAux = (dates) => {
    handleDateChange(dates, setCheckIn, setCheckOut);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const where = whereRef.current.value;
    const adults = adultsRef.current.value;
    const children = childrenRef.current.value;
    const rooms = roomsRef.current.value;

    if (!where || !adults || !rooms || !checkIn || !checkOut) {
      setError(t("searchbarError"));
      return;
    }

    if (isNaN(adults) || adults <= 0) {
      setError(t("searchbarErrorAdults"));
      return;
    }
    if (isNaN(children) || children < 0) {
      setError(t("searchbarErrorChildren"));
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
    console.log({ where, adults, children, rooms, checkIn, checkOut });

    setFilters({
      where,
      adults,
      children: children === "" ? 0 : children,
      rooms,
      checkIn,
      checkOut,
    });

    startTransition(() => {
      navigate(`/lodges/${encodeURIComponent(where)}`);
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
            isRequired
          />
          <Input
            label={t("adults")}
            placeholder={t("adults_ph")}
            ref={adultsRef}
            variant="bordered"
            isRequired
          />
          <Input
            label={t("children")}
            placeholder={t("children_ph")}
            ref={childrenRef}
            variant="bordered"
          />
          <Input
            label={t("rooms")}
            placeholder={t("rooms_ph")}
            ref={roomsRef}
            variant="bordered"
            isRequired
          />
          <DateRangePicker
            label={t("stay_duration")}
            variant="bordered"
            visibleMonths={1}
            startName="checkIn"
            endName="checkOut"
            isRequired
            onChange={handleDateChangeAux}
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
