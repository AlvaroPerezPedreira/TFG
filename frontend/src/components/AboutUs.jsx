import "./styles/contactus.css";
import React from "react";
import { Suspense } from "react";
import AppNavbar from "./AppNavbar";
import Footer from "./Footer";

export default function AboutUs() {
  return (
    <>
      <Suspense fallback="loading">
        <AppNavbar />
        <div className="contact-container">
          <span>About us</span>
        </div>
        <Footer />
      </Suspense>
    </>
  );
}
