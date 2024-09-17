import "./styles/register.css";
import { startTransition, Suspense, useState } from "react";
import useRegister from "../hooks/useRegister";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  Input,
  Checkbox,
} from "@miracle-ui/react";
import { useTranslation } from "react-i18next";
import SpainIcon from "../icons/SpainIcon";
import UKIcon from "../icons/UKIcon";
import FranceIcon from "../icons/FranceIcon";
import LoginSlider from "./Slider";
import ModalContent from "./ModalContent";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [birthdate, setBirthdate] = useState("");
  const { register } = useRegister();
  const [t, i18n] = useTranslation(["register"]);
  const currentLanguage = i18n.language;
  let navigate = useNavigate();

  const [male, setMale] = useState("");
  const [female, setFemale] = useState("");
  const [nonbi, setNonbi] = useState("");
  const [gender, setGender] = useState("male");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(e, birthdate, gender);
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

  const getFlagIcon = (currentLanguage) => {
    if (currentLanguage === "es") {
      return <SpainIcon />;
    } else if (currentLanguage === "en") {
      return <UKIcon />;
    } else {
      return <FranceIcon />;
    }
  };

  return (
    <Suspense fallback="loading">
      <div className="register-wrapper">
        <div className="register-container">
          <div className="register-form-container">
            <div className="register-header-container">
              <div className="register-logo">
                <img
                  src="/images/logo/Logo1op4.jpg"
                  alt="Logo"
                  className="register-logo-img"
                />
                <span>DeepDive</span>
              </div>
              <div className="register-dropdown-container">
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
                      <div className="register-flag-container">
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
                      <div className="register-flag-container">
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
                      <div className="register-flag-container">
                        <FranceIcon />
                        <span>France</span>
                      </div>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>{" "}
              </div>
            </div>
            <form className="register-form" onSubmit={handleSubmit}>
              <div className="register-input-container">
                <div className="register-title-container">
                  <p className="register-form-subtitle">{t("slogan")}</p>
                  <p className="register-form-title">{t("register")}</p>
                </div>

                <Input
                  name="email"
                  text={t("email")}
                  variant="underlined"
                  textColor="white"
                  labelColor="white"
                  underlineColor="white"
                  customWidth="100%"
                  width="full"
                />

                <Input
                  name="username"
                  text={t("username")}
                  variant="underlined"
                  textColor="white"
                  labelColor="white"
                  underlineColor="white"
                  customWidth="100%"
                  width="full"
                />

                <Input
                  name="password"
                  text={t("passwd")}
                  textColor="white"
                  variant="underlined"
                  labelColor="white"
                  underlineColor="white"
                  type="password"
                  width="full"
                />

                <Input
                  name="retype_password"
                  text={t("retype_passwd")}
                  textColor="white"
                  variant="underlined"
                  labelColor="white"
                  underlineColor="white"
                  type="password"
                  width="full"
                />

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

                <div className="register-gender-form-group">
                  <label htmlFor="gender">{t("gender")}</label>
                  <div className="register-gender-checkbox-container">
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

                <div className="register-button-container">
                  <Button
                    radius="none"
                    customWidth="100%"
                    type="submit"
                    customColor="#FFDB58"
                    blackText
                    customRippleColor="black"
                    children={t("continue")}
                  />
                </div>
              </div>
            </form>

            <div className="register-footer">
              {t("alreadySignup")}{" "}
              <button
                onClick={() => {
                  startTransition(() => {
                    navigate("/login");
                  });
                }}
                className="register-login-button"
              >
                {t("login")}
              </button>
            </div>
          </div>

          <div className="register-slider">
            <LoginSlider />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Register;
