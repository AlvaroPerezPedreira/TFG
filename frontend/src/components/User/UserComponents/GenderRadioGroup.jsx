import React from "react";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { useTranslation } from "react-i18next";

export default function GenderRadioGroup({ gender, setGender }) {
  const [t] = useTranslation(["register"]);

  const handleRadioChange = (e) => {
    setGender(e.target.value);
  };

  return (
    <div>
      <RadioGroup
        label={t("gender")}
        color="warning"
        value={gender}
        onChange={handleRadioChange}
      >
        <Radio value="male">{t("male")}</Radio>
        <Radio value="female">{t("female")}</Radio>
        <Radio value="non-binary">{t("non_binary")}</Radio>
      </RadioGroup>
    </div>
  );
}
