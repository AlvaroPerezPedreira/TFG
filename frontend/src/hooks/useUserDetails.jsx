import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

const useUserDetails = () => {
  const token = JSON.parse(localStorage.getItem("authUser")).serviceToken;

  const fetchUserDetails = async ({ email, setUser, setError, setLoading }) => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const finalData = await response.json();
      setUser(finalData);
    } catch (error) {
      console.error("Error fetching user details:", error);
      setError(error.message);
    } finally {
      setLoading(false); // Cambia el estado de carga cuando termine la solicitud
    }
  };
  return { fetchUserDetails };
};

export default useUserDetails;
