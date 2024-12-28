import "./styles/contactus.css";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Suspense } from "react";
import AppNavbar from "./AppNavbar";
import Footer from "./Footer";

export default function Policy() {
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
            <h2>{t("policyTitle")}</h2>
          </div>
          <div className="policy-content">
            <div className="policy-description">
              <p className="section-description">{t("policyDescription")}</p>
            </div>
            <div className="policy-section">
              <h2 class="section-title">{t("policySection1")}</h2>
              <p className="section-description">{t("section1-1")}</p>
              <ul class="section-list">
                <li>{t("section1-2")}</li>
                <li>{t("section1-3")}</li>
                <li>{t("section1-4")}</li>
                <li>{t("section1-5")}</li>
              </ul>
            </div>
            <div className="policy-section">
              <h2 class="section-title">{t("policySection2")}</h2>
              <p className="section-description">{t("section2-1")}</p>
              <ul class="section-list">
                <li>{t("section2-2")}</li>
                <li>{t("section2-3")}</li>
                <li>{t("section2-4")}</li>
                <li>{t("section2-5")}</li>
                <li>{t("section2-6")}</li>
                <li>{t("section2-7")}</li>
              </ul>
            </div>
            <div className="policy-section">
              <h3 class="section-title">{t("policySection3")}</h3>
              <p className="section-description">{t("section3-1")}</p>
              <ul class="section-list">
                <li>{t("section3-2")}</li>
                <li>{t("section3-3")}</li>
                <li>{t("section3-4")}</li>
                <li>{t("section3-5")}</li>
              </ul>
            </div>
            <div className="policy-section">
              <h3 class="section-title">{t("policySection4")}</h3>
              <p className="section-description">{t("section4-1")}</p>
            </div>
            <div className="policy-section">
              <h3 class="section-title">{t("policySection5")}</h3>
              <p className="section-description">{t("section5-1")}</p>
              <ul class="section-list">
                <li>{t("section5-2")}</li>
                <li>{t("section5-3")}</li>
                <li>{t("section5-4")}</li>
              </ul>
              <p className="section-description">{t("section5-5")}</p>
            </div>
            <div className="policy-section">
              <h3 class="section-title">{t("policySection6")}</h3>
              <p className="section-description">{t("section6-1")}</p>
            </div>
            <div className="policy-section">
              <h3 class="section-title">{t("policySection7")}</h3>
              <p className="section-description">{t("section7-1")}</p>
            </div>
            <div className="policy-section">
              <h3 class="section-title">{t("policySection8")}</h3>
              <p className="section-description">{t("section8-1")}</p>
              <p className="section-description">{t("section8-2")}</p>
            </div>
          </div>
        </div>
        <Footer />
      </Suspense>
    </>
  );
}
