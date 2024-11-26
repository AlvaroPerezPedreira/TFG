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
import useUserDetails from "../../hooks/useUserDetails";
import AppNavbar from "../AppNavbar";
import { useThemeContext } from "../../context/ThemeContext";

function UserDetails() {
  const { email } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [t, i18n] = useTranslation(["updProfile"]);
  const { authUser } = useAuthContext();
  const { banUser, unbanUser } = useBanUser();
  const { fetchUserDetails } = useUserDetails();
  const { dark, color } = useThemeContext();

  useEffect(() => {
    fetchUserDetails({ email, setUser, setError, setLoading });
  }, [email]);

  const handleClick = async (e) => {
    e.preventDefault();
    if (user.status === "ACTIVE") await banUser(email);
    else await unbanUser(email);
    window.location.reload();
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
      <AppNavbar />
      <div className="updProfile-container">
        <div className="updProfile-form-container">
          <div className="updProfile-header-container">
            <span>{t("userDetails")}</span>
          </div>

          <div className="updProfile-form">
            <div className="updProfile-personal-data">
              <div className="updProfile-personal-data-1">
                <Input
                  name="email"
                  label={t("email")}
                  variant="underlined"
                  value={user.email ?? ""}
                  color={color}
                  isReadOnly
                />
                <Input
                  name="username"
                  label={t("username")}
                  variant="underlined"
                  value={user.username ?? ""}
                  color={color}
                  isReadOnly
                />
                <Input
                  name="name"
                  label={t("name")}
                  variant="underlined"
                  value={user.name ?? ""}
                  color={color}
                  isReadOnly
                />
                <Input
                  name="lastname"
                  label={t("lastname")}
                  variant="underlined"
                  value={user.lastname ?? ""}
                  color={color}
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
                  value={user.country ?? ""}
                  color={color}
                  isReadOnly
                />
                <Input
                  name="address"
                  label={t("address")}
                  variant="underlined"
                  value={t("private")}
                  color="danger"
                  isReadOnly
                />
                <Input
                  name="passport"
                  label={t("passport")}
                  variant="underlined"
                  value={t("private")}
                  color="danger"
                  isReadOnly
                />
                <Input
                  name="birthdate"
                  label={t("birthdate")}
                  variant="underlined"
                  value={user.birthdate ?? ""}
                  color={color}
                  isReadOnly
                />
              </div>

              <div className="updProfile-personal-data-5">
                <div className="updProfile-gender-form-group">
                  <RadioGroup
                    label={t("gender")}
                    color={color}
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
                  children={
                    user.status === "ACTIVE" ? t("banUser") : t("unbanUser")
                  }
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
