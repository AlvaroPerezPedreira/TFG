import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const useUpdateProfile = () => {
  let navigate = useNavigate();
  const { authUser, setAuthUser } = useAuthContext();
  const [userData, setUserData] = useState(null);

  const token = JSON.parse(localStorage.getItem("authUser")).serviceToken;
  console.log(token);

  const updateProfile = async (e, birthdate, activeLabel) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      email: form.get("email"),
      username: form.get("username"),
      birthdate: birthdate,
      gender: activeLabel,
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
    console.log(finalData);

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

  return { userData, updateProfile };
};

export default useUpdateProfile;
