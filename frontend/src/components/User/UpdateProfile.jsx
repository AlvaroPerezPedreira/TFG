import "./styles/updateProfile.css";
import { Suspense, useState } from "react";

import { Button } from "@nextui-org/button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import useUpdateProfile from "../../hooks/useUpdateProfile";
import { useAuthContext } from "../../context/AuthContext";

import UpdateProfileDatePicker from "./UpdateProfileComponents/UpdateProfileDatePicker";
import GenderRadioGroup from "./UserComponents/GenderRadioGroup";
import FlagDropdown from "../FlagDropdown";
import UpdateProfileFirstInputs from "./UpdateProfileComponents/UpdateProfileFirstInputs";
import UpdateProfileSecondInputs from "./UpdateProfileComponents/UpdateProfileSecondInputs";
import UpdateProfileAvatar from "./UpdateProfileComponents/UpdateProfileAvatar";

const Auth = () => {
  const { updateProfile } = useUpdateProfile();

  const [t, i18n] = useTranslation(["updProfile"]);

  const { authUser, setAuthUser } = useAuthContext();

  const [birthdate, setBirthdate] = useState(authUser.user?.birthdate || "");
  const [gender, setGender] = useState(authUser.user?.gender || "male");

  const [formData, setFormData] = useState({
    username: authUser.user?.username || "",
    name: authUser.user?.name || "",
    lastname: authUser.user?.lastname || "",
    phone: authUser.user?.phone || "",
    birthdate: birthdate,
    country: authUser.user?.country || "",
    gender: gender,
    address: authUser.user?.address || "",
    passport: authUser.user?.passport || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    await updateProfile(e, birthdate, gender);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Suspense fallback="loading">
      <div className="updProfile-container">
        <div className="updProfile-form-container">
          <div className="updProfile-header-container">
            <div className="updProfile-logo">
              <Link to="/" className="updProfile-deepdive-link">
                <img
                  src="/images/logo/Logo1op4.jpg"
                  alt="Logo"
                  className="updProfile-logo-img"
                />
                <span>DeepDive</span>
              </Link>
            </div>
            <div className="updProfile-dropdown-container">
              <FlagDropdown />
            </div>
          </div>

          <form className="updProfile-form" onSubmit={handleSubmit}>
            <div className="updProfile-personal-data">
              <div className="updProfile-personal-data-1">
                <UpdateProfileFirstInputs
                  formData={formData}
                  handleInputChange={handleInputChange}
                />
              </div>
              <div className="updProfile-personal-data-2">
                <UpdateProfileAvatar />
              </div>
            </div>

            <div className="updProfile-personal-data-3">
              <div className="updProfile-personal-data-4">
                <UpdateProfileSecondInputs
                  formData={formData}
                  handleInputChange={handleInputChange}
                />

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
              </div>
            </div>

            <div className="updProfile-button-container">
              <Button
                className="bg-[#FFDB58] text-black w-full"
                color="deepdive"
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
