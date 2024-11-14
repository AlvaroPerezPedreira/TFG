import { Input } from "@nextui-org/input";
import React from "react";
import { useTranslation } from "react-i18next";
import LodgeDescription from "./LodgeDescription";
import LodgeCountryAutocomplete from "./LodgeCountryAutocomplete";
import LodgeMainImage from "./LodgeMainImage";

export default function LodgeFirstInputs({
  setCountry,
  mainImageUrl,
  setMainImageUrl,
  mainImage,
  setMainImage,
}) {
  const [t, i18n] = useTranslation(["createLodge"]);

  return (
    <div className="createLodge-firstInputsContainer">
      <div className="createLodge-leftInputsContainer">
        <Input
          name="name"
          label={t("name")}
          variant="underlined"
          color="warning"
          isRequired
        />
        <Input
          name="address"
          label={t("address")}
          variant="underlined"
          color="warning"
          isRequired
        />
        <Input
          name="city"
          label={t("city")}
          variant="underlined"
          color="warning"
          isRequired
        />
        <LodgeCountryAutocomplete setCountry={setCountry} />
        <div className="createLodge-descriptionContainer">
          <LodgeDescription />
        </div>
      </div>
      <div className="createLodge-rightInputsContainer">
        <LodgeMainImage
          mainImageUrl={mainImageUrl}
          setMainImageUrl={setMainImageUrl}
          mainImage={mainImage}
          setMainImage={setMainImage}
        />
      </div>
    </div>
  );
}
