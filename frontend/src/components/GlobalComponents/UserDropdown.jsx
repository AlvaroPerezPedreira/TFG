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
import {
  HomeIcon,
  EditIcon,
  CreateIcon,
  LogoutIcon,
  NbHammerIcon,
  NbLodgesIcon,
} from "../../icons/UserDropdownIcons";

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
      <Dropdown placement="bottom-end" backdrop="blur">
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
            <p className="font-semibold" style={{ color: "var(--text-color)" }}>
              {t("signed")}
            </p>
            <p
              className="font-semibold"
              style={{ color: "var(--AppMainColor)" }}
            >
              {authUser.user.email}
            </p>
          </DropdownItem>
          <DropdownItem
            style={{ color: "var(--AppMainColor)" }}
            key="home"
            textValue={t("home")}
            variant="bordered"
            startContent={<HomeIcon />}
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
            textValue={t("createLodge1")}
            startContent={<CreateIcon />}
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
            style={{ color: "var(--AppMainColor)" }}
            key="myLodges"
            variant="bordered"
            textValue={t("createLodge1")}
            startContent={<NbLodgesIcon />}
            onClick={() => {
              startTransition(() => {
                navigate("/lodge/myLodges");
              });
            }}
          >
            {t("myLodges")}
          </DropdownItem>
          <DropdownItem
            style={{ color: "var(--AppMainColor)" }}
            key="updateProfile"
            textValue={t("updProfile")}
            variant="bordered"
            startContent={<EditIcon />}
            onClick={() => {
              startTransition(() => {
                navigate("/updateProfile");
              });
            }}
          >
            {t("updProfile")}
          </DropdownItem>
          {authUser.user.role === "ADMIN" && (
            <DropdownItem
              style={{ color: "var(--AppMainColor)" }}
              key="bannedUsers"
              variant="bordered"
              textValue={t("bannedUsers")}
              startContent={<NbHammerIcon />}
              onClick={() => {
                startTransition(() => {
                  navigate("/users/bannedUsers");
                });
              }}
            >
              {t("bannedUsers")}
            </DropdownItem>
          )}
          <DropdownItem
            style={{ color: "var(--errorRed)" }}
            key="logout"
            variant="bordered"
            onClick={logOut}
            startContent={<LogoutIcon />}
            textValue={t("logOut")}
          >
            {t("logOut")}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
