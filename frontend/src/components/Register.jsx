import "./styles/register.css";
import { useState } from "react";
import useRegister from "../hooks/useRegister";
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
import LoginSlider from "./Slider";

const Register = () => {
  const [birthdate, setBirthdate] = useState("");
  const [activeLabel, setActiveLabel] = useState("");
  const [activeCheckbox, setActiveCheckbox] = useState(null);
  const { register } = useRegister();
  const [t, i18n] = useTranslation(["register"]);
  const currentLanguage = i18n.language;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(e, birthdate, activeLabel);
  };

  const handleDateChange = (e) => {
    setBirthdate(e.target.value);
  };

  const handleChangeCheckbox = (label, id) => {
    setActiveLabel(label);
    setActiveCheckbox(id);
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
    <div className="register-wrapper">
      <div className="register-container">
        <div className="register-form-container">
          <div className="register-header-container">
            <div className="register-logo">
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
                  offset={0}
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
                <label htmlFor="birthdate">{t("birthdate")}</label>
                <input
                  type="date"
                  className="form-control"
                  value={birthdate}
                  onChange={handleDateChange}
                />
              </div>

              <div className="register-genre-form-group">
                <label htmlFor="genre">{t("gender")}</label>
                <div className="register-genre-checkbox-container">
                  <div className="register-genre-checkbox">
                    <label htmlFor="male">{t("male")}:</label>
                    <input
                      type="checkbox"
                      id="male"
                      checked={activeCheckbox === "male"}
                      onChange={() => handleChangeCheckbox("male", "male")}
                    ></input>
                  </div>
                  <div className="register-genre-checkbox">
                    <label htmlFor="female">{t("female")}:</label>
                    <input
                      type="checkbox"
                      id="female"
                      checked={activeCheckbox === "female"}
                      onChange={() => handleChangeCheckbox("female", "female")}
                    ></input>
                  </div>
                  <div className="register-genre-checkbox">
                    <label htmlFor="non-binary">{t("non_binary")}:</label>
                    <input
                      type="checkbox"
                      id="non-binary"
                      checked={activeCheckbox === "non-binary"}
                      onChange={() =>
                        handleChangeCheckbox("non-binary", "non-binary")
                      }
                    ></input>
                  </div>
                </div>
              </div>

              <div className="register-button-container">
                <Button
                  radius="none"
                  customWidth="100%"
                  type="submit"
                  children={t("continue")}
                />
              </div>
            </div>
          </form>

          <div className="register-footer">
            {t("alreadySignup")}{" "}
            <a href="/login" className="register-login-link">
              {t("login")}
            </a>
          </div>
        </div>

        <div className="register-slider">
          <LoginSlider />
        </div>
      </div>
    </div>
  );
};

export default Register;
