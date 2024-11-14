import "./styles/changePassword.css";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import UpdateProfileHeaderLink from "./UpdateProfileComponents/UpdateProfileHeaderLink";
import useChangePassword from "../../hooks/useChangePassword";
import FlagDropdown from "../GlobalComponents/FlagDropdown";
import { Suspense } from "react";
import AppNavbar from "../AppNavbar";

export default function ChangePassword() {
  const [t] = useTranslation(["changePassword"]);
  const { changePassword } = useChangePassword();
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const newPwd = form.get("newPassword");
    const rptPwd = form.get("repeatPassword");

    if (newPwd !== rptPwd) {
      setPasswordError(t("passwordsNotMatch"));
      return;
    } else {
      setPasswordError("");
    }
    await changePassword(e, setPasswordError);
  };

  return (
    <Suspense fallback="loading">
      <AppNavbar />
      <div className="changePassword-container">
        <div className="changePassword-form-container">
          <form onSubmit={handleSubmit} className="changePassword-form">
            <div className="changePassword-form-title-container">
              <h1 className="changePassword-form-title">{t("title")}</h1>
            </div>
            <Input
              name="oldPassword"
              placeholder={t("oldPassword")}
              variant="underlined"
              type="password"
              color="warning"
              className="changePassword-form-input"
            />
            <Input
              name="newPassword"
              placeholder={t("newPassword")}
              variant="underlined"
              type="password"
              color="warning"
              className="changePassword-form-input"
            />
            <Input
              name="repeatPassword"
              placeholder={t("rptPassword")}
              variant="underlined"
              type="password"
              color="warning"
              className="changePassword-form-input"
            />

            {passwordError && (
              <div className="changePassword-error-msg">{passwordError}</div>
            )}

            <Button
              className="bg-[#FFDB58] text-black w-full mt-4"
              children={t("save")}
              type="submit"
              radius="none"
            />
          </form>
        </div>
      </div>
    </Suspense>
  );
}
