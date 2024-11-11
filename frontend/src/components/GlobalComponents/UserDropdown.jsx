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
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem
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
            key="createLodge"
            variant="bordered"
            onClick={() => {
              startTransition(() => {
                navigate("/lodge/createLodge");
              });
            }}
          >
            {t("createLodge-translate")}
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
            style={{ color: "#E63946" }}
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
