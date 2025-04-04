import { Input } from "@nextui-org/input";
import React from "react";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "../../../context/AuthContext";
import { useThemeContext } from "../../../context/ThemeContext";

export default function UpdateProfileFirstInputs({}) {
  const [t, i18n] = useTranslation(["updProfile"]);
  const { authUser } = useAuthContext();
  const { dark, color } = useThemeContext();

  return (
    <>
      <Input
        name="username"
        placeholder={t("username")}
        variant="underlined"
        color={color}
        defaultValue={authUser.user?.username || ""}
        label={authUser.user?.username ? t("username") : ""}
      />

      <Input
        name="name"
        placeholder={t("name")}
        variant="underlined"
        color={color}
        defaultValue={authUser.user?.name || ""}
        label={authUser.user?.name ? t("name") : ""}
      />

      <Input
        name="lastname"
        placeholder={t("lastname")}
        variant="underlined"
        color={color}
        defaultValue={authUser.user?.lastname || ""}
        label={authUser.user?.lastname ? t("lastname") : ""}
      />

      <Input
        name="phone"
        placeholder={t("phone")}
        variant="underlined"
        color={color}
        defaultValue={authUser.user?.phone || ""}
        label={authUser.user?.phone ? t("phone") : ""}
      />
    </>
  );
}
