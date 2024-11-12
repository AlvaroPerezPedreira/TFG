import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Tooltip } from "@nextui-org/tooltip";
import React from "react";
import { CountryList } from "../../../utils/CountryListConstant";
import { useTranslation } from "react-i18next";

export default function LodgeCountryAutocomplete({ setCountry }) {
  const [t, i18n] = useTranslation(["createLodge"]);

  return (
    <>
      <Tooltip
        showArrow={true}
        content={t("country_tt")}
        size="sm"
        placement="bottom-start"
        offset={5}
      >
        <Autocomplete
          isRequired
          defaultItems={CountryList}
          label={t("country")}
          variant="underlined"
          color="warning"
          className="max-w"
          onInputChange={setCountry}
          aria-label="country"
        >
          {(country) => (
            <AutocompleteItem key={country.value}>
              {country.label}
            </AutocompleteItem>
          )}
        </Autocomplete>
      </Tooltip>
    </>
  );
}
