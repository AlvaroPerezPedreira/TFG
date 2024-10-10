import "./styles/register.css";
import { startTransition, Suspense, useState } from "react";
import useRegister from "../../hooks/useRegister";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useTranslation } from "react-i18next";
import LoginSlider from "./LoginComponents/Slider";
import { useNavigate } from "react-router-dom";
import UpdateProfileDatePicker from "./UpdateProfileComponents/UpdateProfileDatePicker";
import GenderRadioGroup from "./UserComponents/GenderRadioGroup";
import RegisterInputs from "./RegisterComponents/RegisterInputs";
import FlagDropdown from "../GlobalComponents/FlagDropdown";

const Register = () => {
  const [birthdate, setBirthdate] = useState("");
  const { register } = useRegister();
  const [t, i18n] = useTranslation(["register"]);
  let navigate = useNavigate();

  const [registerError, setRegisterError] = useState("");
  const [gender, setGender] = useState("male");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(e, birthdate, gender, setRegisterError);
  };

  return (
    <Suspense fallback="loading">
      <div className="register-wrapper">
        <div className="register-container">
          <div className="register-form-container">
            <div className="register-header-container">
              <div className="register-logo">
                <img
                  src="/images/logo/LogoBlanco.jpg"
                  alt="Logo"
                  className="register-logo-img"
                />
                <span>DeepDive</span>
              </div>
              <div className="register-dropdown-container">
                <FlagDropdown />
              </div>
            </div>
            <form className="register-form" onSubmit={handleSubmit}>
              <div className="register-input-container">
                <div className="register-title-container">
                  <p className="register-form-subtitle">{t("slogan")}</p>
                  <p className="register-form-title">{t("register")}</p>
                </div>

                <RegisterInputs />

                <div className="register-birthdate-form-group">
                  <UpdateProfileDatePicker
                    birthdate={birthdate}
                    setBirthdate={setBirthdate}
                  />
                </div>

                <div className="register-gender-form-group">
                  <GenderRadioGroup gender={gender} setGender={setGender} />
                </div>

                {registerError && (
                  <div className="register-error-msg">{registerError}</div>
                )}

                <div className="register-button-container">
                  <Button
                    className="bg-[#FFDB58] text-black w-full"
                    radius="none"
                    type="submit"
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
