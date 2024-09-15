import "./styles/updateProfile.css";
import {
  Button,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
} from "@miracle-ui/react";
import { useTranslation } from "react-i18next";
import SpainIcon from "../icons/SpainIcon";
import UKIcon from "../icons/UKIcon";
import FranceIcon from "../icons/FranceIcon";
import { Link } from "react-router-dom";
import { useState } from "react";
import useUpdateProfile from "../hooks/useUpdateProfile";
import { useAuthContext } from "../context/AuthContext";
import ModalContent from "./ModalContent";

const Auth = () => {
  const [t, i18n] = useTranslation(["updProfile"]);
  const currentLanguage = i18n.language;
  const [birthdate, setBirthdate] = useState("");

  const { authUser } = useAuthContext();

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

  const [male, setMale] = useState(
    authUser.user?.gender === "male" ? true : false
  );
  const [female, setFemale] = useState(
    authUser.user?.gender === "female" ? true : false
  );
  const [nonbi, setNonbi] = useState(
    authUser.user?.gender === "non-binary" ? true : false
  );
  const [gender, setGender] = useState("male");

  console.log(formData.username);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(e, birthdate, gender);
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

  const handleCustomChange = (gender_prop) => {
    if (gender_prop === gender) {
      setGender(null);
    }

    setGender(gender_prop);
    setMale("male" === gender_prop ? true : false);
    setFemale("female" === gender_prop ? true : false);
    setNonbi("non_binary" === gender_prop ? true : false);
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
          <div className="updProfile-personal-data">
            <div className="updProfile-personal-data-1">
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
            </div>
            <div className="updProfile-personal-data-2"></div>
          </div>

          <div className="register-birthdate-form-group">
            <Modal
              backdrop="blur"
              button={
                <Button
                  radius="none"
                  color="default"
                  variant="bordered"
                  customWidth="100%"
                  customRippleColor="black"
                  blackText
                  customColor="#FFDB58"
                  children={t("birthdate")}
                ></Button>
              }
            >
              {({ closeModal }) => (
                <div>
                  <ModalContent
                    closeModal={closeModal}
                    handleDateChange={handleDateChange}
                    birthdate={birthdate}
                  />
                </div>
              )}
            </Modal>
          </div>

          <div className="updProfile-personal-data-3">
            <div className="updProfile-personal-data-4">
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
            </div>
            <div className="updProfile-personal-data-5">
              <div className="updProfile-gender-form-group">
                <label className="updProfile-gender-label" htmlFor="gender">
                  {t("gender")}
                </label>
                <div className="updProfile-gender-checkbox-container">
                  <Checkbox
                    name="male_chbox"
                    text={t("male")}
                    onChange={() => handleCustomChange("male")}
                    externalState={[male, setMale]}
                  />
                  <Checkbox
                    name="female_chbox"
                    text={t("female")}
                    onChange={() => handleCustomChange("female")}
                    externalState={[female, setFemale]}
                  />
                  <Checkbox
                    name="nonbi_chbox"
                    text={t("non_binary")}
                    onChange={() => handleCustomChange("non-binary")}
                    externalState={[nonbi, setNonbi]}
                  />
                </div>
              </div>
            </div>
          </div>

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
