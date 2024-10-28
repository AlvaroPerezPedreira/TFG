import "./styles/updateProfile.css";
import React, { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UpdateProfileHeaderLink from "./UpdateProfileComponents/UpdateProfileHeaderLink";
import FlagDropdown from "../GlobalComponents/FlagDropdown";
import { Input } from "@nextui-org/input";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "@nextui-org/radio";
import { Button } from "@nextui-org/button";
import { useAuthContext } from "../../context/AuthContext";
import { UserIcon } from "../../icons/UserIcon";
import useBanUser from "../../hooks/useBanUser";

function UserDetails() {
  const { email } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null);
  const token = JSON.parse(localStorage.getItem("authUser")).serviceToken;
  const [t, i18n] = useTranslation(["updProfile"]);
  const { authUser } = useAuthContext();
  const { banUser } = useBanUser();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/users/${email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              Authorization: `Bearer ${token}`,
            },
          }
        );

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

    fetchUserDetails();
  }, [email, token]);

  const handleClick = async (e) => {
    e.preventDefault();
    await banUser(email);
  };

  // Manejo de errores
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Mensaje de carga
  if (loading) {
    return <></>;
  }

  // Verifica si user no es null antes de acceder a sus propiedades
  if (!user) {
    return <div>{t("noUser")}</div>;
  }

  return (
    <Suspense fallback="loading">
      <div className="updProfile-container">
        <div className="updProfile-form-container">
          <div className="updProfile-header-container">
            <div className="updProfile-logo">
              <UpdateProfileHeaderLink />
            </div>
            <div className="updProfile-dropdown-container">
              <FlagDropdown />
            </div>
          </div>

          <div className="updProfile-form">
            <div className="updProfile-personal-data">
              <div className="updProfile-personal-data-1">
                <Input
                  name="email"
                  label={t("email")}
                  variant="underlined"
                  value={user.email}
                  isReadOnly
                />
                <Input
                  name="username"
                  label={t("username")}
                  variant="underlined"
                  value={user.username}
                  isReadOnly
                />
                <Input
                  name="name"
                  label={t("name")}
                  variant="underlined"
                  value={user.name}
                  isReadOnly
                />
                <Input
                  name="lastname"
                  label={t("lastname")}
                  variant="underlined"
                  value={user.lastname}
                  isReadOnly
                />
              </div>
              <div className="updProfile-personal-data-2">
                <img
                  src={`http://localhost:8080/images/${user.avatar}`}
                  alt=""
                  className="updProfile-avatar-img"
                />
              </div>
            </div>

            <div className="updProfile-personal-data-3">
              <div className="updProfile-personal-data-4">
                <Input
                  name="country"
                  label={t("country")}
                  variant="underlined"
                  value={user.country}
                  isReadOnly
                />
                <Input
                  name="address"
                  label={t("address")}
                  variant="underlined"
                  value={user.address}
                  isReadOnly
                />
                <Input
                  name="passport"
                  label={t("passport")}
                  variant="underlined"
                  value={user.passport}
                  isReadOnly
                />
                <Input
                  name="birthdate"
                  label={t("birthdate")}
                  variant="underlined"
                  value={user.birthdate}
                  isReadOnly
                />
              </div>

              <div className="updProfile-personal-data-5">
                <div className="updProfile-gender-form-group">
                  <RadioGroup
                    label={t("gender")}
                    color="warning"
                    value={user.gender}
                  >
                    <Radio value="male">{t("male")}</Radio>
                    <Radio value="female">{t("female")}</Radio>
                    <Radio value="non-binary">{t("non_binary")}</Radio>
                  </RadioGroup>
                </div>
              </div>
            </div>
            <div className="updProfile-button-container">
              {authUser.user.role === "ADMIN" && (
                <Button
                  children={t("banUser")}
                  variant="bordered"
                  startContent={<UserIcon />}
                  color="danger"
                  onClick={handleClick}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default UserDetails;
