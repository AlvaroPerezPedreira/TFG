import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const useLogin = (e) => {
  let navigate = useNavigate();
  const { setAuthUser } = useAuthContext();

  const login = async (e) => {
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
    console.log(finalData);

    if (finalData.globalError) {
      return;
    }

    localStorage.setItem("authUser", JSON.stringify(finalData));
    setAuthUser(finalData);
    navigate("/");
  };

  return { login };
};

export default useLogin;
