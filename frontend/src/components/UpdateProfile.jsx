import "./styles/updateProfile.css";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@mirakle-ui/react";
import { useTranslation } from "react-i18next";
import SpainIcon from "../icons/SpainIcon";
import UKIcon from "../icons/UKIcon";
import FranceIcon from "../icons/FranceIcon";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import DateModal from "./DateModal";
import useUpdateProfile from "../hooks/useUpdateProfile";
import { useAuthContext } from "../context/AuthContext";

const Auth = () => {
  const [t, i18n] = useTranslation(["updProfile"]);
  const currentLanguage = i18n.language;
  const [birthdate, setBirthdate] = useState("");
  const [activeLabel, setActiveLabel] = useState("");
  const [activeCheckbox, setActiveCheckbox] = useState(null);
  const [showDateModal, setShowDateModal] = useState(false);

  const { authUser } = useAuthContext();
  console.log(authUser);

  const { updateProfile } = useUpdateProfile();

  const [formData, setFormData] = useState({
    username: authUser.user?.username || "",
    name: authUser.user?.name || "",
    lastname: authUser.user?.lastname || "",
    phone: authUser.user?.phone || "",
    birthdate: authUser.user?.birthdate || "",
    country: authUser.user?.country || "",
    gender: authUser.user?.gender || "",
    address: authUser.user?.address || "",
    passport: authUser.user?.passport || "",
  });

  console.log(formData.username);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(e, birthdate, activeLabel);
  };

  const getFlagIcon = (currentLanguage) => {
    if (currentLanguage === "es") {
      return <SpainIcon />;
    } else if (currentLanguage === "en") {
      return <UKIcon />;
    } else {
      return <FranceIcon />;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setBirthdate(date);
  };

  const handleChangeCheckbox = (label, id) => {
    setActiveLabel(label);
    setActiveCheckbox(id);
  };

  const openModal = () => {
    setShowDateModal(true);
  };

  const closeModal = () => {
    setShowDateModal(false);
  };

  return (
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
            </Link>{" "}
          </div>
          <div className="updProfile-dropdown-container">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  radius="md"
                  variant="bordered"
                  color="default"
                  isIconOnly
                  customRippleColor="black"
                >
                  {getFlagIcon(currentLanguage)}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                position={"bottom-end"}
                offset={10}
                aria-label="Static Actions"
              >
                <DropdownItem
                  key="ES_FLAG"
                  onClick={() => {
                    i18n.changeLanguage("es");
                  }}
                >
                  <div className="updProfile-flag-container">
                    <SpainIcon />
                    <span>Spain</span>
                  </div>
                </DropdownItem>
                <DropdownItem
                  key="EN_FLAG"
                  onClick={() => {
                    i18n.changeLanguage("en");
                  }}
                >
                  <div className="updProfile-flag-container">
                    <UKIcon />
                    <span>United Kingdom</span>
                  </div>
                </DropdownItem>
                <DropdownItem
                  key="FR_FLAG"
                  onClick={() => {
                    i18n.changeLanguage("fr");
                  }}
                >
                  <div className="updProfile-flag-container">
                    <FranceIcon />
                    <span>France</span>
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>{" "}
          </div>
        </div>
        <form className="updProfile-form" onSubmit={handleSubmit}>
          <Input
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            text={t("username")}
            variant="underlined"
            textColor="white"
            labelColor="white"
            underlineColor="white"
            customWidth="100%"
            width="full"
            placeholder={formData.username}
          />

          <Input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            text={t("name")}
            variant="underlined"
            textColor="white"
            labelColor="white"
            underlineColor="white"
            customWidth="100%"
            width="full"
            placeholder={formData.name}
          />

          <Input
            name="lastname"
            value={formData.lastname}
            onChange={handleInputChange}
            text={t("lastname")}
            variant="underlined"
            textColor="white"
            labelColor="white"
            underlineColor="white"
            customWidth="100%"
            width="full"
            placeholder={formData.lastname}
          />

          <Input
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            text={t("phone")}
            variant="underlined"
            textColor="white"
            labelColor="white"
            underlineColor="white"
            customWidth="100%"
            width="full"
            placeholder={formData.phone}
          />

          <div className="register-birthdate-form-group">
            <Button
              onClick={openModal}
              children={t("birthdate")}
              radius="none"
              customWidth="100%"
              customColor="#FFDB58"
              customRippleColor="black"
              blackText
            />
            <DateModal
              showModal={showDateModal}
              closeModal={closeModal}
              handleDateChange={handleDateChange}
            />
          </div>

          <Input
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            text={t("country")}
            variant="underlined"
            textColor="white"
            labelColor="white"
            underlineColor="white"
            customWidth="100%"
            width="full"
            placeholder={formData.country}
          />

          <div className="updProfile-gender-form-group">
            <label htmlFor="gender">{t("gender")}</label>
            <div className="updProfile-gender-checkbox-container">
              <div className="updProfile-gender-checkbox">
                <label htmlFor="male">{t("male")}:</label>
                <input
                  type="checkbox"
                  id="male"
                  checked={activeCheckbox === "male"}
                  onChange={() => handleChangeCheckbox("male", "male")}
                />
              </div>
              <div className="updProfile-gender-checkbox">
                <label htmlFor="female">{t("female")}:</label>
                <input
                  type="checkbox"
                  id="female"
                  checked={activeCheckbox === "female"}
                  onChange={() => handleChangeCheckbox("female", "female")}
                />
              </div>
              <div className="updProfile-gender-checkbox">
                <label htmlFor="non-binary">{t("non_binary")}:</label>
                <input
                  type="checkbox"
                  id="non-binary"
                  checked={activeCheckbox === "non-binary"}
                  onChange={() =>
                    handleChangeCheckbox("non-binary", "non-binary")
                  }
                />
              </div>
            </div>
          </div>

          <Input
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            text={t("address")}
            variant="underlined"
            textColor="white"
            labelColor="white"
            underlineColor="white"
            customWidth="100%"
            width="full"
            placeholder={formData.address}
          />

          <Input
            name="passport"
            value={formData.passport}
            onChange={handleInputChange}
            text={t("passport")}
            variant="underlined"
            textColor="white"
            labelColor="white"
            underlineColor="white"
            customWidth="100%"
            width="full"
            placeholder={formData.passport}
          />

          <div className="updProfile-button-container">
            <Button
              radius="none"
              customWidth="100%"
              type="submit"
              customColor="#FFDB58"
              blackText
              customRippleColor="black"
              children={t("update")}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
