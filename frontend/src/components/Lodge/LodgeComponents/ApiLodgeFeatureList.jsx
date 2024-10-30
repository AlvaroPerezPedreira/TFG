import React from "react";
import featureIconMap from "../../../utils/FeatureIconMap";
import { Chip } from "@nextui-org/chip";
import featureIdMap from "../../../utils/FeatureIdNameMap";

export default function ApiLodgeFeatureList({ lodge }) {
  const uniqueFeatures = [
    ...new Set(lodge?.hotel_facilities?.split(",").map(Number)),
  ];

  return (
    <>
      {uniqueFeatures
        .filter((id) => {
          const isValid = featureIdMap[id];
          return isValid;
        }) // Filtra IDs válidos
        .map((id) => {
          const name = featureIdMap[id];
          const icon = featureIconMap[name];
          return (
            <Chip
              key={id}
              color="warning"
              variant="bordered"
              startContent={icon}
              className="border-[1px] p-2 py-4"
            >
              {name}
            </Chip>
          );
        })}
    </>
  );
}
