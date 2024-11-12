import { Input } from "@nextui-org/input";
import React from "react";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "../../../context/AuthContext";

export default function UpdateProfileSecondInputs() {
  const [t, i18n] = useTranslation(["updProfile"]);
  const { authUser } = useAuthContext();

  return (
    <>
      <Input
        name="address"
        placeholder={t("address")}
        variant="underlined"
        color="warning"
        defaultValue={authUser.user?.address || ""}
        label={authUser.user?.address ? t("address") : ""}
      />

      <Input
        name="passport"
        placeholder={t("passport")}
        variant="underlined"
        color="warning"
        defaultValue={authUser.user?.passport || ""}
        label={authUser.user?.passport ? t("passport") : ""}
      />
    </>
  );
}
