import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

const useRegister = (e) => {
  let navigate = useNavigate();
  const [t, i18n] = useTranslation(["register"]);

  const { setAuthUser } = useAuthContext();

  const register = async (e, birthdate, activeLabel, setRegisterError) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      email: form.get("email"),
      password: form.get("password"),
      repeat_password: form.get("repeat_password"),
      username: form.get("username"),
      birthdate: birthdate,
      gender: activeLabel,
    };

    const response = await fetch("http://localhost:8080/api/users/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    });

    const finalData = await response.json();

    if (!response.ok) {
      if (finalData.globalError) {
        if (
          finalData.globalError === "project.exceptions.InvalidEmailException"
        ) {
          setRegisterError(t("InvalidEmail"));
        } else if (
          finalData.globalError ===
          "project.exceptions.DuplicateInstanceException"
        ) {
          setRegisterError(t("EmailAlreadyExists"));
        } else if (
          finalData.globalError ===
          "project.exceptions.InvalidBirthdateException"
        ) {
          setRegisterError(t("InvalidBirthdate"));
        } else {
          setRegisterError(t("RegisterGenericError"));
        }
      } else {
        setRegisterError(t("RegisterFieldError"));
      }
      return;
    }

    localStorage.setItem("authUser", JSON.stringify(finalData));
    setAuthUser(finalData);
    navigate("/");
  };

  return { register };
};

export default useRegister;
