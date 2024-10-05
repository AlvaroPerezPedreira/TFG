import "./styles/register.css";
import { startTransition, Suspense, useState } from "react";
import useRegister from "../hooks/useRegister";
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
import LoginSlider from "./Slider";
import ModalContentBirthdate from "./ModalContentBirthdate";
import { useNavigate } from "react-router-dom";
import UpdateProfileDatePicker from "./UpdateProfileDatePicker";
import GenderRadioGroup from "./GenderRadioGroup";

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
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <Button
                      radius="md"
                      variant="bordered"
                      color="default"
                      isIconOnly
                    >
                      {getFlagIcon(currentLanguage)}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
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
                  placeholder={t("email")}
                  variant="underlined"
                />

                <Input
                  name="username"
                  placeholder={t("username")}
                  variant="underlined"
                />

                <Input
                  name="password"
                  placeholder={t("passwd")}
                  variant="underlined"
                  type="password"
                />

                <Input
                  name="retype_password"
                  placeholder={t("retype_passwd")}
                  variant="underlined"
                  type="password"
                />

                <div className="register-birthdate-form-group">
                  <UpdateProfileDatePicker
                    birthdate={birthdate}
                    setBirthdate={setBirthdate}
                  />
                </div>

                <div className="register-gender-form-group">
                  <GenderRadioGroup gender={gender} setGender={setGender} />
                </div>

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
