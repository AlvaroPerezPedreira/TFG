import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { startTransition } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useTranslation } from "react-i18next";

export default function LodgeCard({
  index,
  lodge_email,
  lodge_name,
  price_per_night,
  lodge_provider,
  image_url,
  checkIn,
  checkOut,
}) {
  let navigate = useNavigate();
  const [t] = useTranslation(["lodge"]);

  const handlePress = () => {
    if (lodge_provider === "DeepDive") {
      startTransition(() => {
        navigate(`/lodge/${lodge_email}`);
      });
    } else {
      startTransition(() => {
        const queryParams = new URLSearchParams({
          checkIn,
          checkOut,
        });
        navigate(`/lodgeApi/${lodge_email}?${queryParams.toString()}`);
      });
    }
  };

  return (
    <Card
      key={index}
      isHoverable
      className="py-4"
      isPressable
      onPress={handlePress}
    >
      <CardHeader className="pb-3 pt-0 px-4 flex-col items-start">
        <h2 className="font-bold text-xl pb-2 text-left text-pretty">
          <span style={{ color: "var(--AppMainColor)" }}>{lodge_name} </span>
        </h2>
        <small className="text-sm pb-1">
          {t("price_per_night")} {price_per_night}
        </small>
        <p className="text-xs text-default-500">
          {t("provider")} {lodge_provider}
        </p>
      </CardHeader>
      <CardBody className="overflow-visible py-2 flex-1 h-full justify-end w-full">
        <img
          alt="Card background"
          className="object-cover rounded-xl min-w-full min-h-[230px] max-h-[230px] bg-red-500"
          src={image_url}
        />
      </CardBody>
    </Card>
  );
}
