import "./styles/bannedUsers.css";
import React, { Suspense, useEffect, startTrsition } from "react";
import { useTranslation } from "react-i18next";
import AppNavbar from "../AppNavbar";
import { useBannedUsersStore } from "../../store/useBannedUsersStore";
import useBanUser from "../../hooks/useBanUser";
import BannedUserCard from "./UserComponents/BannedUserCard";

function BannedUsers() {
  const [t] = useTranslation(["updProfile"]);
  const { users } = useBannedUsersStore();
  const { getBannedUsers } = useBanUser();

  useEffect(() => {
    getBannedUsers();
  }, []);

  return (
    <>
      <Suspense fallback="loading">
        <AppNavbar />
        <div className="bannedUsers-container">
          <div className="bannedUsers-titleContainer">
            <span className="bannedUsers-title">{t("bannedUsersTitle")}</span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            {Array.isArray(users) &&
              users.map((user, index) => (
                <BannedUserCard key={user.email} user={user} />
              ))}
          </div>
        </div>
      </Suspense>
    </>
  );
}

export default BannedUsers;
