import "./styles/updateProfile.css";
import { Suspense, useState, startTransition } from "react";

import { Button } from "@nextui-org/button";
import { useTranslation } from "react-i18next";
import useUpdateProfile from "../../hooks/useUpdateProfile";
import { useAuthContext } from "../../context/AuthContext";

import UpdateProfileDatePicker from "./UpdateProfileComponents/UpdateProfileDatePicker";
import GenderRadioGroup from "./UserComponents/GenderRadioGroup";
import UpdateProfileFirstInputs from "./UpdateProfileComponents/UpdateProfileFirstInputs";
import UpdateProfileSecondInputs from "./UpdateProfileComponents/UpdateProfileSecondInputs";
import UpdateProfileAvatar from "./UpdateProfileComponents/UpdateProfileAvatar";
import FlagDropdown from "../GlobalComponents/FlagDropdown";
import UpdateProfileHeaderLink from "./UpdateProfileComponents/UpdateProfileHeaderLink";
import { CountryList } from "../../utils/CountryListConstant";
import { useNavigate } from "react-router-dom";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";

const Auth = () => {
  const { updateProfile } = useUpdateProfile();
  const [t, i18n] = useTranslation(["updProfile"]);
  const { authUser } = useAuthContext();
  let navigate = useNavigate();

  const [birthdate, setBirthdate] = useState(authUser.user?.birthdate || "");
  const [gender, setGender] = useState(authUser.user?.gender || "male");
  const [country, setCountry] = useState(authUser.user?.country || "");
  const [errorMessage, setErrorMessage] = useState("");

  console.log("country", country);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateProfile(e, birthdate, gender, country, setErrorMessage);
  };

  return (
    <Suspense fallback="loading">
      <div className="updProfile-container">
        <div className="updProfile-form-container">
          <div className="updProfile-header-container">
            <div className="updProfile-logo">
              <UpdateProfileHeaderLink />
            </div>
            <div className="updProfile-dropdown-container">
              <FlagDropdown />
            </div>
          </div>

          <form className="updProfile-form" onSubmit={handleSubmit}>
            <div className="updProfile-personal-data">
              <div className="updProfile-personal-data-1">
                <UpdateProfileFirstInputs />
              </div>
              <div className="updProfile-personal-data-2">
                <UpdateProfileAvatar />
              </div>
            </div>

            <div className="updProfile-personal-data-3">
              <div className="updProfile-personal-data-4">
                <UpdateProfileSecondInputs />

                <div className="updProfile-country">
                  <Autocomplete
                    defaultItems={CountryList}
                    placeholder={t("country")}
                    variant="underlined"
                    className="max-w"
                    defaultInputValue={country || ""}
                    onInputChange={setCountry}
                  >
                    {(country) => (
                      <AutocompleteItem key={country.value}>
                        {country.label}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                </div>

                <div className="updProfile-birthdate-form-group">
                  <UpdateProfileDatePicker
                    birthdate={birthdate}
                    setBirthdate={setBirthdate}
                  />
                </div>
              </div>

              <div className="updProfile-personal-data-5">
                <div className="updProfile-gender-form-group">
                  <GenderRadioGroup gender={gender} setGender={setGender} />
                </div>

                <div className="updProfile-changePwd-link">
                  <button
                    type="button"
                    onClick={() => {
                      startTransition(() => {
                        navigate("/changePassword");
                      });
                    }}
                    className="updProfile-changePassword-button"
                  >
                    {t("changePassword")}
                  </button>
                </div>
              </div>
            </div>

            {errorMessage && (
              <div className="updProfile-error-msg">{errorMessage}</div>
            )}

            <div className="updProfile-button-container">
              <Button
                className="bg-[#FFDB58] text-black w-full"
                type="submit"
                children={t("update")}
                radius="none"
              />
            </div>
          </form>
        </div>
      </div>
    </Suspense>
  );
};

export default Auth;
