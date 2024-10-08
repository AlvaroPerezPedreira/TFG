import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const useChangePassword = () => {
  let navigate = useNavigate();
  const { authUser, setAuthUser } = useAuthContext();
  const [userData, setUserData] = useState(null);

  const token = JSON.parse(localStorage.getItem("authUser")).serviceToken;

  const changePassword = async (e, birthdate, gender) => {
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

    const finalData = await response.json();
    //console.log(finalData);

    if (finalData.globalError || finalData.error || finalData.fieldErrors) {
      return;
    }

    const updatedAuthUser = {
      ...authUser,
      user: finalData,
    };

    localStorage.setItem("authUser", JSON.stringify(updatedAuthUser));
    setAuthUser(updatedAuthUser);
    navigate("/");
  };

  return { userData, changePassword };
};

export default useChangePassword;
