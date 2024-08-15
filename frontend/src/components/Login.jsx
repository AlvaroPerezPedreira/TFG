import "./styles/login.css";
import useLogin from "../hooks/useLogin";
import LoginSlider from "./Slider";
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
import { useNavigate } from "react-router-dom";
import { startTransition, Suspense } from "react";

const Auth = () => {
  const { login } = useLogin();
  const [t, i18n] = useTranslation(["login"]);
  const currentLanguage = i18n.language;
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(e);
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
      <div className="login-wrapper">
        <div className="login-container">
          <div className="login-form-container">
            <div className="login-header-container">
              <div className="login-logo">
                <img
                  src="/images/logo/Logo1op4.jpg"
                  alt="Logo"
                  className="login-logo-img"
                />
                <span>DeepDive</span>
              </div>
              <div className="login-dropdown-container">
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
                      <div className="login-flag-container">
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
                      <div className="login-flag-container">
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
                      <div className="login-flag-container">
                        <FranceIcon />
                        <span>France</span>
                      </div>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>{" "}
              </div>
            </div>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="login-input-container">
                <div className="login-title-container">
                  <p className="login-form-subtitle">{t("slogan")}</p>
                  <p className="login-form-title">{t("login")}</p>
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

                <div className="login-button-container">
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

            <div className="login-footer">
              {t("haveAccount")}{" "}
              <button
                onClick={() => {
                  startTransition(() => {
                    navigate("/register");
                  });
                }}
                className="login-register-button"
              >
                {t("signUp")}
              </button>
            </div>
          </div>

          <div className="login-slider">
            <LoginSlider />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Auth;
