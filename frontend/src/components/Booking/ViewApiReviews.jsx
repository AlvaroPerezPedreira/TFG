import "./styles/viewreviews.css";

import React, { Suspense, useEffect, useState, startTransition } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useGetLodge from "../../hooks/useGetLodge";
import AppNavbar from "../AppNavbar";
import { useThemeContext } from "../../context/ThemeContext";
import { useAuthContext } from "../../context/AuthContext";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import useBookings from "../../hooks/useBookings";
import { Link } from "@nextui-org/link";
import ReviewCard from "./BookingComponents/ReviewCard";
import useApi from "../../hooks/useApi";

export default function ViewApiReviews() {
  const [lodge, setLodge] = useState(null);
  const [reviews, setReviews] = useState(null);

  const { email } = useParams();
  const hotel_id = email.split("_")[1].split("@")[0];

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");

  const { getLodgeDetails } = useApi();
  const { getReviews } = useBookings();
  const { color } = useThemeContext();
  const { authUser } = useAuthContext();
  const [t, i18n] = useTranslation(["booking"]);
  const currentLanguage = i18n.language;
  let navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("authUser")).serviceToken;

  useEffect(() => {
    const getLodgeAux = async () => {
      const lodge = await getLodgeDetails(hotel_id, currentLanguage);
      setLodge(lodge);
      getReviews({ setReviews, lodgeEmail: email, token });
    };

    getLodgeAux();
  }, []);

  if (!lodge || !reviews) {
    return <div>Loading...</div>;
  }

  console.log(lodge);

  return (
    <Suspense fallback="loading">
      <AppNavbar />
      <div className="viewReviews-container">
        <div className="viewReviews-titleContainer">
          <span className="viewReviews-title">{t("viewReviewsTitle")}</span>
        </div>
        <div className="viewReviews-lodgeData">
          <div className="viewReviews-lodgeData-row">
            <span className="viewReviews-lodgeData-name">{lodge.name}</span>
            <span className="viewReviews-lodgeData-provider">
              <span style={{ color: "var(--text-color)" }}>
                {t("provider")}
              </span>{" "}
              <span style={{ color: "var(--AppMainColor)" }}>Booking.com</span>
            </span>
          </div>
          <div className="viewReviews-lodgeData-row">
            <span className="viewReviews-lodgeData-email">
              <Link
                onPress={() => {
                  startTransition(() => {
                    const queryParams = new URLSearchParams({
                      checkIn,
                      checkOut,
                    });
                    navigate(`/lodgeApi/${email}?${queryParams.toString()}`);
                  });
                }}
                size="sm"
              >
                {email}
              </Link>
            </span>
            <span className="viewReviews-lodgeData-address">
              {lodge?.address}, {lodge?.zip}, {lodge?.city}, {lodge?.country}{" "}
            </span>
          </div>
        </div>
        <div className="viewReviews-reviewContainer">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))
          ) : (
            <div>{t("noReviews")}</div>
          )}
        </div>
      </div>
      <Footer />
    </Suspense>
  );
}
