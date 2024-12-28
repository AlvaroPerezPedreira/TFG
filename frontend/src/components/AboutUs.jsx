import "./styles/contactus.css";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Suspense } from "react";
import AppNavbar from "./AppNavbar";
import Footer from "./Footer";

export default function AboutUs() {
  const [t] = useTranslation(["misc"]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Suspense fallback="loading">
        <AppNavbar />
        <div className="contact-container">
          <div className="contact-title">
            <h2>{t("aboutTitle")}</h2>
          </div>
        </div>
        <Footer />
      </Suspense>
    </>
  );
}
