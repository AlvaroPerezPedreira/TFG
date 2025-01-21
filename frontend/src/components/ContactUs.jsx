import "./styles/contactus.css";
import React, { useState } from "react";
import { Suspense } from "react";
import AppNavbar from "./AppNavbar";
import Footer from "./Footer";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "../context/AuthContext";
import { useThemeContext } from "../context/ThemeContext";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import emailjs from "emailjs-com";
import toast, { Toaster } from "react-hot-toast";

export default function ContactUs() {
  const [t] = useTranslation(["misc"]);
  const { authUser } = useAuthContext();
  const { color } = useThemeContext();
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const templateParams = {
      from_email: authUser.user.email,
      message: form.get("description"),
    };

    emailjs
      .send(
        "service_yprdlsd",
        "template_xr5hou8",
        templateParams,
        "JiDz-T5jod-BfIyx8"
      )
      .then((response) => {
        setStatus("SUCCESS");
        toast.success(t("emailSuccess"), {
          // Mensaje de éxito
          duration: 3000,
          style: {
            borderRadius: "10px",
            backgroundColor: "var(--main-background)",
            border: "1px solid var(--inverted-background-color)",
            color: "var(--AppMainColor)",
          },
        });
      })
      .catch((error) => {
        setStatus("ERROR");
        toast.error(t("emailError"), {
          // Mensaje de error
          duration: 3000,
          style: {
            borderRadius: "10px",
            backgroundColor: "var(--main-background)",
            border: "1px solid var(--inverted-background-color)",
            color: "var(--AppMainColor)",
          },
        });
      });
  };

  console.log(authUser);
  return (
    <>
      <Suspense fallback="loading">
        <AppNavbar />
        <div className="contact-container">
          <div className="contact-title">
            <h2>{t("contactTitle")}</h2>
          </div>
          <form className="contact-content" onSubmit={handleSubmit}>
            <Input
              name="email"
              label={t("email")}
              variant="underlined"
              value={authUser.user.email}
              color={color}
              isReadOnly
            />
            <div className="contact-textArea">
              <Textarea
                name="description"
                className="col-span-12 md:col-span-6 mb-6 md:mb-0"
                label={t("emailContent")}
                labelPlacement="outside"
                placeholder={t("emailContentPlaceholder")}
                variant="bordered"
                color={color}
              />
            </div>
            <div className="contact-button">
              <Button
                className="bg-[#006FEE] dark:bg-[#FFDB58] text-black w-[200px]"
                type="submit"
                children={t("contactButton")}
                radius="none"
              />
            </div>
          </form>
        </div>
        <Footer />
        <Toaster position="top-center" reverseOrder={false} />{" "}
      </Suspense>
    </>
  );
}
