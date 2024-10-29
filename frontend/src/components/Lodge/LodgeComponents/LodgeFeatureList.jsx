import React from "react";
import { Chip } from "@nextui-org/chip";
import featureIconMap from "../../../utils/FeatureIconMap";

export default function LodgeFeatureList({ feature, currentLanguage }) {
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
    return featureIconMap[feature_nameEN] || "";
  };

  return (
    <>
      <Chip
        color="warning"
        variant="bordered"
        startContent={getIcon(feature.feature_nameEN)}
        className="border-[1px] p-2 py-4"
      >
        {getName(currentLanguage)}
      </Chip>
    </>
  );
}
