import "./styles/login.css";
import useLogin from "../../hooks/useLogin";
import { Button } from "@nextui-org/button";
import LoginSlider from "./LoginComponents/Slider";
import { useTranslation } from "react-i18next";

import { useNavigate } from "react-router-dom";
import { startTransition, Suspense, useState } from "react";
import LoginInputs from "./LoginComponents/LoginInputs";
import FlagDropdown from "../GlobalComponents/FlagDropdown";
import ThemeComponent from "../GlobalComponents/ThemeComponent";
import { useThemeContext } from "../../context/ThemeContext";

const Auth = () => {
  const { login } = useLogin();
  const [t, i18n] = useTranslation(["login"]);
  let navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const { dark } = useThemeContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(e, setLoginError);
  };

  return (
    <Suspense fallback="loading">
      <div className="login-wrapper">
        <div className="login-container">
          <div className="login-form-container">
            <div className="login-header-container">
              <div className="login-logo">
              {dark ? (
              <img
                src="/images/logo/LogoBlanco.jpg"
                alt="Logo"
                className="navbar-logo-img"
              />
            ) : (
              <img
                src="/images/logo/LogoNegro.jpg"
                alt="Logo"
                className="navbar-logo-img"
              />
            )}
                <span style={{ fontFamily: "Caveat, sans-serif" }}>
                  DeepDive
                </span>
              </div>
              <div className="login-dropdown-container">
                <ThemeComponent />
                <FlagDropdown />
              </div>
            </div>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="login-input-container">
                <div className="login-title-container">
                  <p className="login-form-subtitle">{t("slogan")}</p>
                  <p className="login-form-title">{t("login")}</p>
                </div>

                <LoginInputs />

                {loginError && (
                  <div className="login-error-msg">{loginError}</div>
                )}

                <div className="login-button-container">
                  <Button
                    className="bg-[#006FEE] dark:bg-[#FFDB58] text-black w-full"
                    radius="none"
                    type="submit"
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
