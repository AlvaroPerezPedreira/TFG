import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

const useUpdateProfile = () => {
  let navigate = useNavigate();
  const [t, i18n] = useTranslation(["register"]);
  const { authUser, setAuthUser } = useAuthContext();
  const [userData, setUserData] = useState(null);

  const token = JSON.parse(localStorage.getItem("authUser")).serviceToken;

  const updateProfile = async (e, birthdate, gender, setErrorMessage) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      username: form.get("username"),
      birthdate: birthdate,
      gender: gender,
      name: form.get("name"),
      lastname: form.get("lastname"),
      phone: form.get("phone"),
      address: form.get("address"),
      passport: form.get("passport"),
      country: form.get("country"),
    };

    const response = await fetch(`http://localhost:8080/api/users/updateUser`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const finalData = await response.json();

    if (!response.ok) {
      if (finalData.globalError) {
        if (
          finalData.globalError ===
          "project.exceptions.InvalidBirthdateException"
        ) {
          setErrorMessage(t("InvalidBirthdate"));
        } else {
          setErrorMessage(t("RegisterGenericError"));
        }
      } else {
        setErrorMessage(t("RegisterGenericError"));
      }
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

  return { userData, updateProfile };
};

export default useUpdateProfile;
