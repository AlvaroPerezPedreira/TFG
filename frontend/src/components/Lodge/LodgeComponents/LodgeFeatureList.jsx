import React from "react";
import { Chip } from "@nextui-org/chip";
import {
  featureIconMap,
  featureIconMapDark,
} from "../../../utils/FeatureIconMap";
import { useThemeContext } from "../../../context/ThemeContext";

export default function LodgeFeatureList({ feature, currentLanguage }) {
  const { dark, color } = useThemeContext();

  const getName = (currentLanguage) => {
    if (currentLanguage === "es") {
      return feature.feature_nameES;
    } else if (currentLanguage === "en") {
      return feature.feature_nameEN;
    } else {
      return feature.feature_nameFR;
    }
  };

  const getIcon = (feature_nameEN) => {
    if (dark) {
      return featureIconMap[feature_nameEN] || "";
    } else {
      return featureIconMapDark[feature_nameEN] || "";
    }
  };

  return (
    <>
      <Chip
        color={color}
        variant="bordered"
        startContent={getIcon(feature.feature_nameEN)}
        className="border-[1px] p-2 py-4"
      >
        {getName(currentLanguage)}
      </Chip>
    </>
  );
}
