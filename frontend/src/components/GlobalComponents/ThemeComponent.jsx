import React from "react";
import { MoonIcon, SunIcon } from "../../icons/ThemeIcons";
import {Switch} from "@nextui-org/switch";
import { useThemeContext } from "../../context/ThemeContext";

export default function ThemeComponent() {
    const { color, dark, setDark } = useThemeContext();

    const handleMode = () => {
      setDark((prev) => !prev);
    };

  return (
    <>
    <Switch
      defaultSelected
      size="md"
      color="default"
      startContent={<SunIcon />}
      endContent={<MoonIcon />}
      onChange={handleMode}
    />
    </>
  );
}
