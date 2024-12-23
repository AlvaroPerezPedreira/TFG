import "./styles/ratebooking.css";
import React, { startTransition, Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AppNavbar from "../AppNavbar";
import useBookings from "../../hooks/useBookings";
import { useNavigate, useParams } from "react-router-dom";
import { useThemeContext } from "../../context/ThemeContext";
import { Input, Textarea } from "@nextui-org/input";
import Footer from "../Footer";
import { StarRating } from "star-rating-react-ts";
import StartIcon from "../../icons/StartIcon";
import { Button } from "@nextui-org/button";

function RateBooking() {
  const [t] = useTranslation(["booking"]);
  const { id } = useParams();
  let navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("authUser")).serviceToken;
  const { color } = useThemeContext();
  const { getTheBooking, getRateBooking } = useBookings();

  const [booking, setBooking] = useState({});
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleSubmit = (e) => {
    getRateBooking({
      token,
      id,
      lodgeEmail: booking.lodgeEmail,
      description,
      rating,
    });
    startTransition(() => {
      navigate("/");
    });
  };

  useEffect(() => {
    getTheBooking({ token, setBooking, id });
  }, []);

  return (
    <Suspense fallback="loading">
      <AppNavbar />
      <div className="rateBooking-container">
        <div className="rateBooking-titleContainer">
          <span className="rateBooking-title">{t("rateBookingTitle")}</span>
        </div>
        <div className="rateBooking-form">
          <Input
            name="email"
            label={t("rateLodgeEmail")}
            variant="underlined"
            value={booking.lodgeEmail}
            color={color}
            isReadOnly
          />
          <div className="rateBooking-rating">
            <span className="rateBooking-ratingTitle">{t("rateStars")}</span>
            <StarRating
              onClick={handleRating}
              numStars={5}
              icon={<StartIcon />}
            />
          </div>
          <Textarea
            className="max-w"
            label={t("rateText")}
            labelPlacement="outside"
            variant="bordered"
            color={color}
            onValueChange={setDescription}
          />
          <div className="rateBooking-buttonContainer">
            <Button
              className="bg-[#006FEE] dark:bg-[#FFDB58] text-black w-full"
              radius="none"
              type="submit"
              children={t("submitReview")}
              onPress={handleSubmit}
            />
          </div>
        </div>
      </div>
      <Footer />
    </Suspense>
  );
}

export default RateBooking;
