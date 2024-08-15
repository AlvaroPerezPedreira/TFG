import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const useRegister = (e) => {
  let navigate = useNavigate();
  const { setAuthUser } = useAuthContext();

  const register = async (e, birthdate, activeLabel) => {
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

    if (finalData.globalError || finalData.error || finalData.fieldErrors) {
      return;
    }

    localStorage.setItem("authUser", JSON.stringify(finalData));
    setAuthUser(finalData);
    navigate("/");
  };

  return { register };
};

export default useRegister;
