import "./styles/book.css";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import React, { startTransition, Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AppNavbar from "../AppNavbar";
import { useParams, useLocation } from "react-router-dom";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useThemeContext } from "../../context/ThemeContext";
import { DateInput, TimeInput } from "@nextui-org/date-input";
import ClockIcon from "../../icons/ClockIcon";
import {
  convertToDate,
  formatDate,
  getTotalDays,
  handleTimeChange2,
} from "../../Functions/calendarFunctions";
import { Divider } from "@nextui-org/divider";
import { DateIcon } from "../../icons/MainAppIcons";
import Cards from "react-credit-cards-2";
import { InputOtp } from "@nextui-org/input-otp";
import useBookings from "../../hooks/useBookings";
import { useNavigate } from "react-router-dom";
import useApi from "../../hooks/useApi";

export default function BookApi() {
  const [t, i18n] = useTranslation(["booking"]);
  const token = JSON.parse(localStorage.getItem("authUser")).serviceToken;
  let navigate = useNavigate();

  const [lodge, setLodge] = useState(null);
  const [lodgeCheckInOut, setLodgeCheckInOut] = useState(null);
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });
  const [errors, setErrors] = useState([]);

  const currentLanguage = i18n.language;
  const { email } = useParams();
  const hotel_id = email.split("_")[1].split("@")[0];

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");

  const { dark, color } = useThemeContext();

  const { getLodgeDetails, getLodgeDetailsCheckInOut } = useApi();
  const { bookLodge } = useBookings();

  useEffect(() => {
    const getLodgeAux = async () => {
      const lodge = await getLodgeDetails(hotel_id, currentLanguage);
      setLodge(lodge);
    };
    const getLodgeWithCheckInOutAux = async () => {
      const lodgeCheckInOut = await getLodgeDetailsCheckInOut(
        hotel_id,
        currentLanguage,
        checkIn,
        checkOut
      );
      setLodgeCheckInOut(lodgeCheckInOut);
    };
    getLodgeAux();
    getLodgeWithCheckInOutAux();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors([]);
    const newErrors = [];

    if (state.number.length !== 16) {
      newErrors.push(t("cardNumberError"));
    }
    if (state.cvc.length !== 3) {
      newErrors.push(t("cvcError"));
    }
    if (state.expiry.length !== 4) {
      newErrors.push(t("expireDateError"));
    }

    if (state.name.trim() === "") {
      newErrors.push(t("nameError"));
    }

    if (newErrors.length > 0) {
      setErrors(newErrors); // Actualiza el estado con los errores
    } else {
      bookLodge({
        token: token,
        checkIn: lodge.checkin.from,
        checkOut: lodge.checkout.to,
        arrivalTime: formatDate(checkIn),
        departureTime: formatDate(checkOut),
        totalPrice: parseFloat(
          lodgeCheckInOut.composite_price_breakdown.gross_amount.value.toFixed(
            2
          )
        ),
        lodgeEmail: email,
        isApi: true,
      });
      startTransition(() => {
        navigate("/");
      });
    }
  };

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  if (!lodge || !lodgeCheckInOut) {
    return (
      <Suspense fallback="loading">
        <AppNavbar />
        <div className="loading-container">
          <span>Loading123...</span>
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
            value={lodge.name}
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
            name="address"
            label={t("address")}
            variant="underlined"
            value={`${[
              lodge?.address,
              lodge?.district,
              lodge?.zip,
              lodge?.city,
              lodge?.country,
            ]
              .filter(Boolean)
              .join(", ")}`}
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
            value={handleTimeChange2(lodge.checkin.from, "checkIn")}
            isReadOnly
          />
          <TimeInput
            label={t("checkOut")}
            variant="underlined"
            color={color}
            startContent={<ClockIcon color={dark ? "#FFDB58" : "#006FEE"} />}
            value={handleTimeChange2(lodge.checkout.to, "checkIn")}
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
            value={convertToDate(formatDate(checkIn))}
            isReadOnly
          />
          <DateInput
            label={t("departureDate")}
            variant="underlined"
            color={color}
            startContent={<DateIcon />}
            value={convertToDate(formatDate(checkOut))}
            isReadOnly
          />
        </div>
        <div className="book-bookSecondInputs">
          <Input
            name="totalDays"
            label={t("totalDays")}
            variant="underlined"
            value={`${getTotalDays(
              formatDate(checkIn),
              formatDate(checkOut)
            )} ${t("days")}`}
            color={color}
            isReadOnly
          />
          <Input
            name="totalPrice"
            label={t("totalPrice")}
            variant="underlined"
            value={`${lodgeCheckInOut.composite_price_breakdown.gross_amount.value.toFixed(
              2
            )} €`}
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
              isRequired
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
              isRequired
            />
            <div className="book-paymentThirdInputs">
              <InputOtp
                name="expiry"
                description={t("expireDate")}
                length={4}
                variant="underlined"
                color={color}
                value={state.expiry}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                size="sm"
                isRequired
              />
              <InputOtp
                name="cvc"
                description={t("cvc")}
                length={3}
                variant="underlined"
                color={color}
                value={state.cvc}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                size="sm"
                isRequired
              />
            </div>
          </div>
        </div>
        {errors.length > 0 && (
          <div className="error-messages">
            {errors.map((error, index) => (
              <div key={index} className="error-message">
                {error}
              </div>
            ))}
          </div>
        )}
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
