import "./styles/bannedUsers.css";
import React, { Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AppNavbar from "../AppNavbar";
import { useBannedUsersStore } from "../../store/useBannedUsersStore";
import useBanUser from "../../hooks/useBanUser";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { UserIcon } from "../../icons/UserIcon";

function BannedUsers() {
  const [t] = useTranslation(["updProfile"]);
  const { users, removeUser } = useBannedUsersStore();
  const { getBannedUsers, unbanUser } = useBanUser();

  useEffect(() => {
    getBannedUsers();
  }, []);

  console.log(users);

  const handleClick = async (e, user) => {
    e.preventDefault();
    await unbanUser(user.email);
    removeUser(user);
    window.location.reload();
  };

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
                <Card className="py-4" key={index}>
                  <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="bannedUsers-cardEmail">
                      {t("email")}:{" "}
                      <span className="bannedUsers-cardEmailData">
                        {user.email}
                      </span>
                    </p>
                    <p className="bannedUsers-cardEmail">
                      {t("username")}:{" "}
                      <span className="bannedUsers-cardEmailData">
                        {user.username}
                      </span>
                    </p>
                    <small className="text-default-500">
                      {t("fullName")}:{" "}
                      <span style={{ color: "var(--AppMainColor)" }}>
                        {(user.name || "") + " " + (user.lastname || "")}
                      </span>
                    </small>
                  </CardHeader>
                  <CardBody className="overflow-visible py-2">
                    <img
                      alt="Card background"
                      className="object-cover rounded-xl min-w-full min-h-[230px] max-h-[230px] bg-red-500"
                      src={`http://localhost:8080/images/${user.avatar}`}
                    />
                  </CardBody>
                  <CardFooter className="flex justify-center mx-auto">
                    <Button
                      children={t("unbanUser")}
                      variant="bordered"
                      color="danger"
                      startContent={<UserIcon />}
                      onClick={(e) => handleClick(e, user)}
                    />
                  </CardFooter>
                </Card>
              ))}
          </div>
        </div>
      </Suspense>
    </>
  );
}

export default BannedUsers;
