import "./styles/lodgedetails.css";

import React, { Suspense, useEffect, useState, startTransition } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LodgeFeatureList from "./LodgeComponents/LodgeFeatureList";
import { handleDateChange2 } from "../../Functions/calendarFunctions";
import { Divider } from "@nextui-org/divider";
import { DateRangePicker } from "@nextui-org/date-picker";
import { Button } from "@nextui-org/button";
import useGetLodge from "../../hooks/useGetLodge";
import EmblaCarousel from "./LodgeComponents/EmblaCarousel";
import UserLink from "./LodgeComponents/UserLink";
import LodgeAccordion from "./LodgeComponents/LodgeAccordion";
import AppNavbar from "../AppNavbar";
import { useThemeContext } from "../../context/ThemeContext";
import { useAuthContext } from "../../context/AuthContext";
import { useBannedLodgesStore } from "../../store/useBannedLodgesStore";
import useBanLodge from "../../hooks/useBanLodge";
import LodgeBanIcon from "../../icons/LodgeBanIcon";
import Footer from "../Footer";
import useBookings from "../../hooks/useBookings";
import { useNavigate } from "react-router-dom";

export default function LodgeDetails() {
  const [lodge, setLodge] = useState(null);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [availability, setAvailability] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [hasReviews, setHasReviews] = useState(false);

  const { email } = useParams();
  const { getLodge } = useGetLodge();
  const { color } = useThemeContext();
  const { authUser } = useAuthContext();
  const { addLodge, removeLodge } = useBannedLodgesStore();
  const { banLodge, unbanLodge } = useBanLodge();
  const { getHasReviews } = useBookings();
  const { getAvailability } = useBookings();
  const token = JSON.parse(localStorage.getItem("authUser")).serviceToken;
  const [t, i18n] = useTranslation(["lodgeDetails"]);
  const currentLanguage = i18n.language;
  let navigate = useNavigate();

  const OPTIONS = { loop: true };

  useEffect(() => {
    const getLodgeAux = async () => {
      const lodge = await getLodge(email);
      setLodge(lodge);
      getHasReviews({ lodgeEmail: email, setHasReviews });
    };
    getLodgeAux();
  }, []);

  const handleDateChangeAux = (dates) => {
    handleDateChange2(dates, setCheckIn, setCheckOut);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getAvailability({
      token,
      setAvailability,
      lodgeEmail: email,
      checkIn,
      checkOut,
      setErrorMsg,
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // Usamos startTransition para no bloquear la UI al cambiar el estado
    startTransition(async () => {
      if (lodge.is_banned === false) {
        await banLodge(email);
        // Actualizamos el estado y el store
        setLodge((prevLodge) => ({ ...prevLodge, is_banned: true }));
        addLodge(lodge); // Agregamos el usuario al store
      } else {
        await unbanLodge(email);
        // Actualizamos el estado y el store
        setLodge((prevLodge) => ({ ...prevLodge, is_banned: false }));
        removeLodge(lodge); // Removemos el usuario del store
      }
    });
  };

  const handleBooking = async (e) => {
    startTransition(() => {
      const queryParams = new URLSearchParams({
        checkIn,
        checkOut,
      });
      navigate(`/bookLodge/${email}?${queryParams.toString()}`);
    });
  };

  const handleComments = () => {
    startTransition(() => {
      navigate(`/bookings/viewReviews/${email}`);
    });
  };

  console.log(hasReviews);

  return (
    <Suspense fallback="loading">
      <AppNavbar />
      <div className="lodgeDetails-container">
        <div className="lodgeDetails-firstinputs-container">
          <div className="lodgeDetails-row">
            <h1 className="lodgeDetails-lodgeName">{lodge?.lodge_name}</h1>
            <span className="lodgeDetails-provider">
              <span className="lodgeDetails-providerTitle">
                {t("provider")}:
              </span>
              <span className="lodgeDetails-providerName">
                {lodge?.lodge_provider}
              </span>
            </span>
          </div>
          <div className="lodgeDetails-userAvatar">
            <UserLink user={lodge?.user} />
            <Button
              className="bg-[#006FEE] dark:bg-[#FFDB58] text-black"
              children={hasReviews ? t("viewComments") : t("noComments")}
              onPress={handleComments}
              isDisabled={!hasReviews}
            />
          </div>
          <div className="lodgeDetails-row">
            <span className="lodgeDetails-address">{lodge?.lodge_address}</span>
          </div>
        </div>
        <Divider className="lodgeDetails-Hdivider" />
        <div className="w-full">
          {lodge?.images?.length > 0 && (
            <EmblaCarousel slides={lodge.images} options={OPTIONS} />
          )}
        </div>
        <Divider className="lodgeDetails-Hdivider" />
        <div className="lodgeDetails-featureList">
          {lodge?.features.map((feature, index) => (
            <LodgeFeatureList
              key={index}
              feature={feature}
              currentLanguage={currentLanguage}
            />
          ))}
        </div>
        <Divider className="lodgeDetails-Hdivider" />
        <div className="lodgeDetails-secondInputs">
          <div className="lodgeDetails-lodgeData">
            <LodgeAccordion lodge={lodge} />
          </div>
          <Divider className="lodgeDetails-Vdivider" orientation="vertical" />
          <div className="lodgeDetails-lodgeAvailability">
            <span className="lodgeDetails-rooms">
              {t("totalRooms")}: {lodge?.available_rooms}
            </span>
            <form
              className="lodgeDetails-checkAvailability"
              onSubmit={handleSubmit}
            >
              <DateRangePicker
                label={t("stay_duration")}
                variant="bordered"
                visibleMonths={1}
                startName="checkIn"
                endName="checkOut"
                color={color}
                isRequired
                onChange={handleDateChangeAux}
              />
              <div className="lodgeDetails-button">
                <Button
                  className="bg-[#006FEE] dark:bg-[#FFDB58] text-black"
                  type="submit"
                  radius="none"
                >
                  {t("checkButton")}
                </Button>
              </div>
            </form>
            <div className="lodgeDetails-bookingSection">
              {availability ? (
                <Button
                  className="bg-[#006FEE] dark:bg-[#FFDB58] text-black"
                  type="submit"
                  radius="none"
                  children={t("bookButton")}
                  disable={!availability}
                  onPress={handleBooking}
                />
              ) : (
                <div className="lodgeDetails-errorMsg">{errorMsg}</div>
              )}
            </div>
          </div>
        </div>
        <div className="lodgeDetails-banButton-container">
          {authUser.user.role === "ADMIN" && (
            <Button
              children={
                lodge && lodge.is_banned === false
                  ? t("banLodge")
                  : t("unbanLodge")
              }
              variant="bordered"
              startContent={<LodgeBanIcon />}
              color="danger"
              onPress={handleClick}
            />
          )}
        </div>
      </div>
      <Footer />
    </Suspense>
  );
}
