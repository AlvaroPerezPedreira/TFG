import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const useUpdateProfile = (userId) => {
  let navigate = useNavigate();
  const { setAuthUser } = useAuthContext();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(
        `http://localhost:8080/api/users/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${localStorage.getItem("authUser")}.token`,
          },
        }
      );

      const data = await response.json();
      setUserData(data);
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

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

    const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${localStorage.getItem("authUser")}.token`,
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

  return { userData, updateProfile };
};

export default useUpdateProfile;
