import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const useChangePassword = () => {
  let navigate = useNavigate();
  const [t] = useTranslation(["changePassword"]);

  const token = JSON.parse(localStorage.getItem("authUser")).serviceToken;

  const changePassword = async (e, setPasswordError) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      oldPassword: form.get("oldPassword"),
      newPassword: form.get("newPassword"),
      repeatPassword: form.get("repeatPassword"),
    };

    const response = await fetch(
      `http://localhost:8080/api/users/changePassword`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const finalData = await response.json();

      if (finalData.globalError) {
        setPasswordError(t("oldPwdIncorrect"));
      } else {
        setPasswordError(t("pwdError"));
      }
      return;
    }

    navigate("/");
  };
  return { changePassword };
};

export default useChangePassword;
