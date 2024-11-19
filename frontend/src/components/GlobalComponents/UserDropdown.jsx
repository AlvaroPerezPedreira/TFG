import React from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { startTransition } from "react";
import { Avatar } from "@nextui-org/avatar";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

export default function UserDropdown() {
  const [t, i18n] = useTranslation(["navbar"]);
  const { authUser, setAuthUser } = useAuthContext();
  let navigate = useNavigate();

  const logOut = () => {
    startTransition(() => {
      localStorage.removeItem("authUser");
      setAuthUser(null);
      navigate("/login");
    });
  };

  return (
    <div>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            as="button"
            className="transition-transform"
            src={`http://localhost:8080/images/${authUser.user.avatar}`}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions">
          <DropdownItem
            variant=""
            key="profile"
            className="h-14 gap-2"
            textValue={t("profile")}
          >
            <p className="font-semibold">{t("signed")}</p>
            <p
              className="font-semibold"
              style={{ color: "var(--AppMainColor)" }}
            >
              {authUser.user.email}
            </p>
          </DropdownItem>
          <DropdownItem
            style={{ color: "var(--AppMainColor)" }}
            key="createLodge"
            variant="bordered"
            onClick={() => {
              startTransition(() => {
                navigate("/");
              });
            }}
          >
            {t("home")}
          </DropdownItem>
          <DropdownItem
            style={{ color: "var(--AppMainColor)" }}
            key="createLodge"
            variant="bordered"
            onClick={() => {
              startTransition(() => {
                navigate("/lodge/createLodge");
              });
            }}
          >
            <p> {t("createLodge1")}</p>
            <p> {t("createLodge2")}</p>
          </DropdownItem>
          <DropdownItem
            className="text-[#FFDB58] w-full"
            key="updateProfile"
            variant="bordered"
            onClick={() => {
              startTransition(() => {
                navigate("/updateProfile");
              });
            }}
          >
            {t("updProfile")}
          </DropdownItem>
          <DropdownItem
            style={{ color: "var(--errorRed)" }}
            key="logout"
            variant="bordered"
            onClick={logOut}
            textValue={t("logOut")}
          >
            {t("logOut")}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
