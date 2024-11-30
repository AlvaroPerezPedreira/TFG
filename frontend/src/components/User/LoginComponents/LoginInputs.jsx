import { Input } from "@nextui-org/input";
import React from "react";
import { useTranslation } from "react-i18next";
import { MailIcon, LockIcon } from "../../../icons/MainAppIcons";
import { useThemeContext } from "../../../context/ThemeContext";
import { EyeIcon, EyeIcon2 } from "../../../icons/EyeIcons";

export default function LoginInputs() {
  const [t, i18n] = useTranslation(["login"]);
  const { dark, color } = useThemeContext();
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <>
      <Input
        name="email"
        label={t("email")}
        variant="underlined"
        color={color}
        onClear={() => console.log("input cleared")}
        startContent={<MailIcon color={dark ? "#FFDB58" : "#006FEE"} />}
      />
      <Input
        name="password"
        label={t("passwd")}
        variant="underlined"
        color={color}
        type={isVisible ? "text" : "password"}
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
            aria-label="toggle password visibility"
          >
            {isVisible ? (
              <EyeIcon2
                color={dark ? "#FFFFFF" : "#000000"}
                className="text-2xl text-default-400 pointer-events-none"
              />
            ) : (
              <EyeIcon
                color={dark ? "#FFFFFF" : "#000000"}
                className="text-2xl text-default-400 pointer-events-none"
              />
            )}
          </button>
        }
        startContent={<LockIcon color={dark ? "#FFDB58" : "#006FEE"} />}
      />
    </>
  );
}
