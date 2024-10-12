import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

const useLogin = (e) => {
  const [t, i18n] = useTranslation(["login"]);

  let navigate = useNavigate();
  const { setAuthUser } = useAuthContext();

  const login = async (e, setLoginError) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      email: form.get("email"),
      password: form.get("password"),
    };

    const response = await fetch("http://localhost:8080/api/users/login", {
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
        setLoginError(t("LoginIncorrect"));
      } else {
        setLoginError(t("LoginGenericError")); // Mensaje genérico por defecto
      }
      return;
    }

    localStorage.setItem("authUser", JSON.stringify(finalData));
    setAuthUser(finalData);
    navigate("/");
  };

  return { login };
};

export default useLogin;
