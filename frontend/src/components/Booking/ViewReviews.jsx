import "./styles/viewreviews.css";

import React, { Suspense, useEffect, useState, startTransition } from "react";
import { useParams } from "react-router-dom";
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

export default function ViewReviews() {
  const [lodge, setLodge] = useState(null);
  const [reviews, setReviews] = useState(null);

  const { email } = useParams();
  const { getLodge } = useGetLodge();
  const { getReviews } = useBookings();
  const { color } = useThemeContext();
  const { authUser } = useAuthContext();
  const [t, i18n] = useTranslation(["booking"]);
  const currentLanguage = i18n.language;
  let navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("authUser")).serviceToken;

  useEffect(() => {
    const getLodgeAux = async () => {
      const lodge = await getLodge(email);
      setLodge(lodge);
      getReviews({ setReviews, lodgeEmail: email, token });
    };
    getLodgeAux();
  }, []);

  if (!lodge || !reviews) {
    return <div>Loading...</div>;
  }

  console.log(reviews);

  return (
    <Suspense fallback="loading">
      <AppNavbar />
      <div className="viewReviews-container">
        <div className="viewReviews-titleContainer">
          <span className="viewReviews-title">{t("viewReviewsTitle")}</span>
        </div>
        <div className="viewReviews-lodgeData">
          <div className="viewReviews-lodgeData-row">
            <span className="viewReviews-lodgeData-name">
              {lodge.lodge_name}
            </span>
            <span className="viewReviews-lodgeData-provider">
              <span style={{ color: "var(--text-color)" }}>
                {t("provider")}
              </span>{" "}
              <span style={{ color: "var(--AppMainColor)" }}>
                {lodge.lodge_provider}
              </span>
            </span>
          </div>
          <div className="viewReviews-lodgeData-row">
            <span className="viewReviews-lodgeData-email">
              <Link
                onPress={() => {
                  startTransition(() => {
                    navigate(`/lodge/${lodge.lodge_email}`);
                  });
                }}
                size="sm"
              >
                {lodge.lodge_email}
              </Link>
            </span>
            <span className="viewReviews-lodgeData-address">
              {lodge.lodge_address}
            </span>
          </div>
        </div>
        <div className="viewReviews-reviewContainer">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))
          ) : (
            <div>{t("noReviews")}</div> // Mensaje cuando no hay reseñas
          )}
        </div>
      </div>
      <Footer />
    </Suspense>
  );
}
