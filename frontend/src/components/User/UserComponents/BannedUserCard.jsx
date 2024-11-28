import React, { Suspense, useEffect, startTransition } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/button";
import { UserIcon } from "../../../icons/UserIcon";
import useBanUser from "../../../hooks/useBanUser";
import { useBannedUsersStore } from "../../../store/useBannedUsersStore";
import { Link } from "@nextui-org/link";

export default function BannedUserCard({ user }) {
  const [t] = useTranslation(["updProfile"]);
  let navigate = useNavigate();
  const { unbanUser } = useBanUser();
  const { users, setUsers, removeUser } = useBannedUsersStore();

  const handleClick = async (e, user) => {
    e.preventDefault();
    await unbanUser(user.email);
    const updatedUsers = users.filter((u) => u.email !== user.email);
    setUsers(updatedUsers);
  };

  return (
    <>
      <Card className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="bannedUsers-cardEmail">
            {t("email")}:{" "}
            <span className="bannedUsers-cardEmailData">
              <Link
                onClick={() => {
                  startTransition(() => {
                    navigate(`/users/${user.email}`);
                  });
                }}
                size="sm"
              >
                {user.email}
              </Link>
            </span>
          </p>
          <p className="bannedUsers-cardEmail">
            {t("username")}:{" "}
            <span className="bannedUsers-cardEmailData">{user.username}</span>
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
    </>
  );
}
