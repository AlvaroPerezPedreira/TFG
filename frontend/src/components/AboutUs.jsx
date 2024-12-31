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
          <div className="about-content">
            <p className="about-section">
              {t("aboutSection1.1")}
              <span style={{ color: "var(--AppMainColor)" }}>DeepDive</span>
              {t("aboutSection1.2")}
              <span style={{ color: "var(--AppMainColor)" }}>DeepDive</span>
              {t("aboutSection1.3")}
            </p>
            <p className="about-section">{t("aboutSection2")}</p>
            <p className="about-section">
              {t("aboutSection3.1")}
              <span style={{ color: "var(--AppMainColor)" }}>DeepDive</span>
              {t("aboutSection3.2")}
            </p>
            <p className="about-section">{t("aboutSection4")}</p>
            <p className="about-section">
              {t("aboutSection5.1")}
              <span style={{ color: "var(--AppMainColor)" }}>DeepDive</span>
              {t("aboutSection5.2")}
            </p>
            <p className="about-section">{t("aboutSection6")}</p>
            <p className="about-section-last">
              <span style={{ color: "var(--AppMainColor)" }}>DeepDive</span>
              {t("aboutSection7")}
            </p>
          </div>
        </div>
        <Footer />
      </Suspense>
    </>
  );
}
