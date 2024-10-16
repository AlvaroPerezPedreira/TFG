import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import React from "react";
import { useTranslation } from "react-i18next";

import SpainIcon from "../../icons/SpainIcon";
import UKIcon from "../../icons/UKIcon";
import FranceIcon from "../../icons/FranceIcon";

const getFlagIcon = (currentLanguage) => {
  if (currentLanguage === "es") {
    return <SpainIcon />;
  } else if (currentLanguage === "en") {
    return <UKIcon />;
  } else {
    return <FranceIcon />;
  }
};

export default function FlagDropdown() {
  const [t, i18n] = useTranslation(["FlagDropdown"]);
  const currentLanguage = i18n.language;

  return (
    <div>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button radius="md" variant="light" color="default" isIconOnly>
            {getFlagIcon(currentLanguage)}
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem
            key="ES_FLAG"
            onClick={() => {
              i18n.changeLanguage("es");
            }}
          >
            <div className="login-flag-container">
              <SpainIcon />
              <span>{t("es")}</span>
            </div>
          </DropdownItem>
          <DropdownItem
            key="EN_FLAG"
            onClick={() => {
              i18n.changeLanguage("en");
            }}
          >
            <div className="login-flag-container">
              <UKIcon />
              <span>{t("en")}</span>
            </div>
          </DropdownItem>
          <DropdownItem
            key="FR_FLAG"
            onClick={() => {
              i18n.changeLanguage("fr");
            }}
          >
            <div className="login-flag-container">
              <FranceIcon />
              <span>{t("fr")}</span>
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>{" "}
    </div>
  );
}
