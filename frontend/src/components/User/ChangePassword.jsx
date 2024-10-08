import "./styles/changePassword.css";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import React from "react";
import { useTranslation } from "react-i18next";
import UpdateProfileHeaderLink from "./UpdateProfileComponents/UpdateProfileHeaderLink";
import useChangePassword from "../../hooks/useChangePassword";
import FlagDropdown from "../GlobalComponents/FlagDropdown";
import { Suspense } from "react";

export default function ChangePassword() {
  const [t] = useTranslation(["changePassword"]);
  const { changePassword } = useChangePassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await changePassword(e);
  };

  return (
    <Suspense fallback="loading">
      <div className="changePassword-container">
        <header className="changePassword-header">
          <UpdateProfileHeaderLink />
        </header>
        <div className="changePassword-form-container">
          <form onSubmit={handleSubmit} className="changePassword-form">
            <div className="changePassword-form-title-container">
              <h1 className="changePassword-form-title">{t("title")}</h1>
              <FlagDropdown className="changePassword-flag-dropdown" />
            </div>
            <Input
              name="oldPassword"
              placeholder={t("oldPasswd")}
              variant="underlined"
              type="password"
              className="changePassword-form-input"
            />
            <Input
              name="newPassword"
              placeholder={t("newPasswd")}
              variant="underlined"
              type="password"
              className="changePassword-form-input"
            />
            <Input
              name="repeatPassword"
              placeholder={t("rptPassword")}
              variant="underlined"
              type="password"
              className="changePassword-form-input"
            />
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
