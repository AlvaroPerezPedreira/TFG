import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Tooltip } from "@nextui-org/tooltip";
import React from "react";
import { CountryList } from "../../../utils/CountryListConstant";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../../context/ThemeContext";

export default function UpdLodgeCountryAutocomplete({ country, setCountry }) {
  const [t, i18n] = useTranslation(["createLodge"]);
  const { color } = useThemeContext();

  return (
    <>
      <Tooltip
        showArrow={true}
        content={t("country_tt")}
        size="sm"
        placement="bottom-start"
        offset={5}
        color={color}
      >
        <Autocomplete
          defaultItems={CountryList}
          placeholder={t("country")}
          variant="underlined"
          color={color}
          className="max-w"
          defaultInputValue={country || ""}
          onInputChange={setCountry}
          aria-label="country"
        >
          {(country) => (
            <AutocompleteItem
              key={country.value}
              className="updateLodge-country-item"
            >
              {country.label}
            </AutocompleteItem>
          )}
        </Autocomplete>
      </Tooltip>
    </>
  );
}
