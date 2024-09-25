import "./styles/updateProfile.css";
import { Suspense, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Checkbox } from "@nextui-org/checkbox";
import { useTranslation } from "react-i18next";
import SpainIcon from "../icons/SpainIcon";
import UKIcon from "../icons/UKIcon";
import FranceIcon from "../icons/FranceIcon";
import { Link } from "react-router-dom";
import useUpdateProfile from "../hooks/useUpdateProfile";
import { useAuthContext } from "../context/AuthContext";
import ModalContentBirthdate from "./ModalContentBirthdate";

const Auth = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
                  placeholder={t("username")}
                  variant="underlined"
                  label={formData.username ? t("username") : ""}
                />

                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t("name")}
                  variant="underlined"
                  label={formData.name ? t("name") : ""}
                />

                <Input
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  placeholder={t("lastname")}
                  variant="underlined"
                  label={formData.lastname ? t("lastname") : ""}
                />

                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder={t("phone")}
                  variant="underlined"
                  label={formData.phone ? t("phone") : ""}
                />
              </div>
              <div className="updProfile-personal-data-2"></div>
            </div>

            <div className="register-birthdate-form-group">
              <Button
                onPress={onOpen}
                className="bg-[#FFDB58] text-black w-full"
                radius="none"
                children={t("birthdate")}
              />
              <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalContentBirthdate
                        handleDateChange={handleDateChange}
                        birthdate={birthdate}
                        onClose={onClose}
                      />
                    </>
                  )}
                </ModalContent>
              </Modal>
            </div>

            <div className="updProfile-personal-data-3">
              <div className="updProfile-personal-data-4">
                <Input
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder={t("country")}
                  variant="underlined"
                  label={formData.country ? t("country") : ""}
                />

                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder={t("address")}
                  variant="underlined"
                  label={formData.address ? t("address") : ""}
                />

                <Input
                  name="passport"
                  value={formData.passport}
                  onChange={handleInputChange}
                  placeholder={t("passport")}
                  variant="underlined"
                  label={formData.passport ? t("passport") : ""}
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
                      children={t("male")}
                      onChange={() => handleCustomChange("male")}
                      externalState={[male, setMale]}
                    />
                    <Checkbox
                      name="female_chbox"
                      children={t("female")}
                      onChange={() => handleCustomChange("female")}
                      externalState={[female, setFemale]}
                    />
                    <Checkbox
                      name="nonbi_chbox"
                      children={t("non_binary")}
                      onChange={() => handleCustomChange("non-binary")}
                      externalState={[nonbi, setNonbi]}
                    />
                  </div>
                </div>
              </div>
            </div>

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
