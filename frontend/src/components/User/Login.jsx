import "./styles/login.css";
import useLogin from "../../hooks/useLogin";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import LoginSlider from "./LoginComponents/Slider";
import { useTranslation } from "react-i18next";

import { useNavigate } from "react-router-dom";
import { startTransition, Suspense } from "react";
import LoginInputs from "./LoginComponents/LoginInputs";
import FlagDropdown from "../GlobalComponents/FlagDropdown";

const Auth = () => {
  const { login } = useLogin();
  const [t, i18n] = useTranslation(["login"]);
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(e);
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

                <div className="login-button-container">
                  <Button
                    className="bg-[#FFDB58] text-black w-full"
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
