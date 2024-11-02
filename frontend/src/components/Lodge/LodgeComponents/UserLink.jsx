import React, { startTransition } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "@nextui-org/user";
import { Link } from "@nextui-org/link";

export default function UserLink({ user }) {
  let navigate = useNavigate();

  return (
    <User
      name={user ? `${user.name} ${user.lastname}` : "Gleen D. Fogel"}
      description={
        <Link
          onClick={() => {
            startTransition(() => {
              navigate(
                user
                  ? `/users/${user.email}`
                  : `/users/LodgeOwner@apibooking.com`
              );
            });
          }}
          size="sm"
        >
          {user ? user.email : "LodgeOwner@apibooking.com"}
        </Link>
      }
      avatarProps={{
        src: `http://localhost:8080/images/${
          user ? user.avatar : "LodgeOwner@apibooking.com_BookingImg.jpg"
        }`,
      }}
    />
  );
}
