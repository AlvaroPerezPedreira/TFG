import "./styles/contactus.css";
import React from "react";
import { Suspense } from "react";
import AppNavbar from "./AppNavbar";
import Footer from "./Footer";

export default function Policy() {
  return (
    <>
      <Suspense fallback="loading">
        <AppNavbar />
        <div className="contact-container">
          <span>Privacy Policy</span>
        </div>
        <Footer />
      </Suspense>
    </>
  );
}
