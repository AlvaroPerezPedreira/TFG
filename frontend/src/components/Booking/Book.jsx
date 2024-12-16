import "./styles/book.css";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import React, { startTransition, Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AppNavbar from "../AppNavbar";
import { useParams, useLocation } from "react-router-dom";
import { Button } from "@nextui-org/button";
import useGetLodge from "../../hooks/useGetLodge";
import { Input } from "@nextui-org/input";
import { useThemeContext } from "../../context/ThemeContext";
import { DateInput, TimeInput } from "@nextui-org/date-input";
import ClockIcon from "../../icons/ClockIcon";
import {
  convertToDate,
  getTotalDays,
  handleTimeChange2,
} from "../../Functions/calendarFunctions";
import { Divider } from "@nextui-org/divider";
import { DateIcon } from "../../icons/MainAppIcons";
import Cards from "react-credit-cards-2";
import { InputOtp } from "@nextui-org/input-otp";

export default function Book() {
  const [t] = useTranslation(["booking"]);

  const [lodge, setLodge] = useState(null);
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const { email } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");

  const { dark, color } = useThemeContext();

  const { getLodge } = useGetLodge();

  useEffect(() => {
    const getLodgeAux = async () => {
      const lodge = await getLodge(email);
      setLodge(lodge);
    };
    getLodgeAux();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // useBooking
    console.log("Booked", lodge, email, checkIn, checkOut);
  };

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  if (!lodge) {
    return (
      <Suspense fallback="loading">
        <AppNavbar />
        <div className="loading-container">
          <span>Loading...</span>
        </div>
      </Suspense>
    );
  }

  return (
    <Suspense fallback="loading">
      <AppNavbar />
      <form className="book-container" onSubmit={handleSubmit}>
        <div className="book-header-container">
          <span>{t("bookLodge")}</span>
        </div>
        <div className="book-lodgeFirstInputs">
          <Input
            name="lodgeName"
            label={t("lodgeName")}
            variant="underlined"
            value={lodge.lodge_name}
            color={color}
            isReadOnly
          />
          <Input
            name="lodgeEmail"
            label={t("lodgeEmail")}
            variant="underlined"
            value={email}
            color={color}
            isReadOnly
          />
          <Input
            name="pricePerNight"
            label={t("pricePerNight")}
            variant="underlined"
            value={`${lodge.price_per_night} €`}
            color={color}
            isReadOnly
          />
          <Input
            name="address"
            label={t("address")}
            variant="underlined"
            value={`${lodge.lodge_address}, ${lodge.city}, ${lodge.country}`}
            color={color}
            isReadOnly
          />
        </div>
        <div className="book-lodgeSecondInputs">
          <TimeInput
            label={t("checkIn")}
            variant="underlined"
            color={color}
            startContent={<ClockIcon color={dark ? "#FFDB58" : "#006FEE"} />}
            value={handleTimeChange2(lodge.check_in, "checkIn")}
            isReadOnly
          />
          <TimeInput
            label={t("checkOut")}
            variant="underlined"
            color={color}
            startContent={<ClockIcon color={dark ? "#FFDB58" : "#006FEE"} />}
            value={handleTimeChange2(lodge.check_out, "checkIn")}
            isReadOnly
          />
        </div>
        <Divider className="book-horizontalDivider" />
        <div className="book-bookFirstInputs">
          <DateInput
            label={t("arrivalDate")}
            variant="underlined"
            color={color}
            startContent={<DateIcon />}
            value={convertToDate(checkIn)}
            isReadOnly
          />
          <DateInput
            label={t("departureDate")}
            variant="underlined"
            color={color}
            startContent={<DateIcon />}
            value={convertToDate(checkOut)}
            isReadOnly
          />
        </div>
        <div className="book-bookSecondInputs">
          <Input
            name="totalDays"
            label={t("totalDays")}
            variant="underlined"
            value={`${getTotalDays(checkIn, checkOut)} ${t("days")}`}
            color={color}
            isReadOnly
          />
          <Input
            name="totalPrice"
            label={t("totalPrice")}
            variant="underlined"
            value={`${
              getTotalDays(checkIn, checkOut) * lodge.price_per_night
            } €`}
            color={color}
            isReadOnly
          />
        </div>
        <Divider className="book-horizontalDivider" />
        <div className="book-bookPaymentFirstInputs">
          <Cards
            number={state.number}
            expiry={state.expiry}
            cvc={state.cvc}
            name={state.name}
            focused={state.focus}
          />
          <div className="book-paymentSecondInputs">
            <Input
              type="number"
              name="number"
              label={t("cardNumber")}
              variant="underlined"
              color={color}
              value={state.number}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            <Input
              name="name"
              label={t("cardName")}
              type="text"
              variant="underlined"
              color={color}
              value={state.name}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            <div className="book-paymentThirdInputs">
              <Input
                name="expiry"
                label={t("expireDate")}
                variant="underlined"
                color={color}
                value={state.expiry}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                size="sm"
              />
              <InputOtp
                name="cvc"
                label={t("cvc")}
                length={3}
                variant="underlined"
                color={color}
                value={state.cvc}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                size="md"
              />
            </div>
          </div>
        </div>
        <div className="book-buttonContainer">
          <Button
            className="bg-[#006FEE] dark:bg-[#FFDB58] text-black w-full"
            radius="none"
            type="submit"
            children={t("bookLodgeButton")}
          />
        </div>
      </form>
    </Suspense>
  );
}
