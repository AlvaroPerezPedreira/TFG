import React, { startTransition, useState } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Avatar } from "@nextui-org/avatar";
import { Link } from "@nextui-org/link";
import { useNavigate } from "react-router-dom";
import { User } from "@nextui-org/user";
import { useAuthContext } from "../../../context/AuthContext";
import CloseIcon from "../../../icons/CloseIcon";
import { useTranslation } from "react-i18next";
import StarReviewIcon from "../../../icons/StarReviewIcon";
import useBookings from "../../../hooks/useBookings";

export default function ReviewCard({ review }) {
  let navigate = useNavigate();
  const { authUser } = useAuthContext();
  const [t, i18n] = useTranslation(["booking"]);
  const token = JSON.parse(localStorage.getItem("authUser")).serviceToken;
  const { banReview } = useBookings();
  const [isBlocked, setIsBlocked] = useState(false);

  if (!review || !review.user) {
    return <div>Loading...</div>; // O un mensaje de error si los datos no están disponibles
  }

  const handleBlock = () => {
    console.log("block comment");
    banReview({ token, reviewId: review.id });
    setIsBlocked(true);
  };

  return (
    <>
      <Card className="max-w-[340px]">
        <CardHeader className="justify-between">
          <User
            name={`${review.user.name || ""} ${
              review.user.lastname || ""
            }`.trim()}
            description={
              review.user.email ? (
                <Link
                  onPress={() => {
                    startTransition(() => {
                      navigate(`/users/${review.user.email}`);
                    });
                  }}
                  size="sm"
                >
                  {review.user.email}
                </Link>
              ) : (
                "No email available"
              )
            }
            avatarProps={{
              src: `http://localhost:8080/images/${review.user.avatar}`,
            }}
          />
        </CardHeader>
        <CardBody className="px-3 py-0 text-small text-default-400">
          <p>{review.review_text}</p>
          <span className="pt-2 star-container">
            {[...Array(review.rating)].map((_, index) => (
              <StarReviewIcon key={index} />
            ))}
          </span>
        </CardBody>
        <CardFooter className="flex justify-center mx-auto gap-5">
          {authUser.user.role === "ADMIN" &&
            (!isBlocked ? (
              <Button
                children={t("blockComment")}
                variant="bordered"
                startContent={<CloseIcon />}
                color="danger"
                onPress={handleBlock}
              />
            ) : (
              <Button
                children={t("blockedComment")}
                variant="bordered"
                color="danger"
                isDisabled
              />
            ))}
        </CardFooter>
      </Card>
    </>
  );
}
