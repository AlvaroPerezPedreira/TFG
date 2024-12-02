import { Input } from "@nextui-org/input";
import React from "react";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../../context/ThemeContext";
import UpdLodgeCountryAutocomplete from "./UpdLodgeCountryAutocomplete";
import UpdLodgeMainImage from "./UpdLodgeMainImage";
import UpdLodgeDescription from "./UpdLodgeDescription";

export default function UpdLodgeFirstInputs({
  lodge,
  setCountry,
  mainImageUrl,
  setMainImageUrl,
  mainImage,
  setMainImage,
}) {
  const [t, i18n] = useTranslation(["createLodge"]);
  const { dark, color } = useThemeContext();

  return (
    <div className="updateLodge-firstInputsContainer">
      <div className="updateLodge-leftInputsContainer">
        <Input
          name="name"
          placeholder={t("name")}
          variant="underlined"
          color={color}
          defaultValue={lodge?.lodge_name || ""}
          label={lodge?.lodge_name ? t("name") : ""}
        />
        <Input
          name="address"
          placeholder={t("address")}
          variant="underlined"
          color={color}
          defaultValue={lodge?.lodge_address || ""}
          label={lodge?.lodge_address ? t("address") : ""}
        />
        <Input
          name="city"
          placeholder={t("city")}
          variant="underlined"
          color={color}
          defaultValue={lodge?.city || ""}
          label={lodge?.city ? t("city") : ""}
        />
        <div className="mt-[10px]">
          <UpdLodgeCountryAutocomplete
            country={lodge.country}
            setCountry={setCountry}
          />
        </div>
        <div className="updateLodge-descriptionContainer">
          <UpdLodgeDescription description={lodge.lodge_description} />
        </div>
      </div>
      <div className="updateLodge-rightInputsContainer">
        <UpdLodgeMainImage
          lodgeImage={lodge.images[0].image_url}
          mainImageUrl={mainImageUrl}
          setMainImageUrl={setMainImageUrl}
          mainImage={mainImage}
          setMainImage={setMainImage}
        />
      </div>
    </div>
  );
}
