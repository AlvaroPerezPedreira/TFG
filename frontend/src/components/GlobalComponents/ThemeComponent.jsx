import React from "react";
import {
  MoonIcon,
  SunIcon,
  NbSunIcon,
  NbMoonIcon,
} from "../../icons/ThemeIcons";
import { Switch } from "@nextui-org/switch";
import { useThemeContext } from "../../context/ThemeContext";
import { Button } from "@nextui-org/button";

export default function ThemeComponent() {
  const { color, dark, setDark } = useThemeContext();

  const handleMode = () => {
    setDark((prev) => !prev);
  };

  return (
    <>
      <Button isIconOnly onClick={handleMode} variant="" size="sm">
        {dark ? <NbMoonIcon /> : <NbSunIcon />}
      </Button>
      {/* <Switch
        defaultSelected
        size="md"
        color="default"
        startContent={<SunIcon />}
        endContent={<MoonIcon />}
        onChange={handleMode}
      /> */}
    </>
  );
}
