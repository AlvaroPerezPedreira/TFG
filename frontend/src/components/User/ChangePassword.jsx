import "./styles/changePassword.css";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import React from "react";
import { useTranslation } from "react-i18next";
import UpdateProfileHeaderLink from "./UpdateProfileComponents/UpdateProfileHeaderLink";
import useChangePassword from "../../hooks/useChangePassword";

export default function ChangePassword() {
  const [t] = useTranslation(["changePassword"]);
  const { changePassword } = useChangePassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await changePassword(e);
  };

  return (
    <div>
      <UpdateProfileHeaderLink />
      <form onSubmit={handleSubmit}>
        <Input
          name="oldPassword"
          placeholder={t("oldPasswd")}
          variant="underlined"
          type="password"
        />
        <Input
          name="newPassword"
          placeholder={t("newPasswd")}
          variant="underlined"
          type="password"
        />
        <Input
          name="repeatPassword"
          placeholder={t("rptPassword")}
          variant="underlined"
          type="password"
        />

        <Button
          className="bg-[#FFDB58] text-black w-full"
          children={t("save")}
          type="submit"
          radius="none"
        />
      </form>
    </div>
  );
}
