import React, { Suspense, useEffect, startTransition } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/button";
import useBanLodge from "../../../hooks/useBanLodge";
import { Link } from "@nextui-org/link";
import LodgeBanIcon from "../../../icons/LodgeBanIcon";
import { useBannedLodgesStore } from "../../../store/useBannedLodgesStore";

export default function BannedLodgeCard({ lodge }) {
  const [t] = useTranslation(["lodgeDetails"]);
  let navigate = useNavigate();
  const { unbanLodge } = useBanLodge();
  const { lodges, setLodges, removeLodge } = useBannedLodgesStore();

  const handleClick = async (e, lodge) => {
    e.preventDefault();
    await unbanLodge(lodge.lodge_email);
    const updatedLodges = lodges.filter(
      (l) => l.lodge_email !== lodge.lodge_email
    );
    setLodges(updatedLodges);
  };

  return (
    <>
      <Card className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="bannedLodges-cardEmail">
            {t("email")}:{" "}
            <span className="bannedLodges-cardEmailData">
              <Link
                onClick={() => {
                  startTransition(() => {
                    navigate(`/lodge/${lodge.lodge_email}`);
                  });
                }}
                size="sm"
              >
                {lodge.lodge_email}
              </Link>
            </span>
          </p>
          <p className="bannedLodges-cardEmail">
            {t("name")}:{" "}
            <span className="bannedLodges-cardEmailData">
              {lodge.lodge_name}
            </span>
          </p>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <img
            alt="Card background"
            className="object-cover rounded-xl min-w-full min-h-[230px] max-h-[230px] bg-red-500"
            src={
              lodge.images && lodge.images.length > 0
                ? `http://localhost:8080/images/${lodge.images[0].image_url}`
                : "http://localhost:8080/images/Default_LodgeImage.jpg"
            }
          />
        </CardBody>
        <CardFooter className="flex justify-center mx-auto">
          <Button
            children={t("unbanLodge")}
            variant="bordered"
            color="danger"
            startContent={<LodgeBanIcon />}
            onClick={(e) => handleClick(e, lodge)}
          />
        </CardFooter>
      </Card>
    </>
  );
}
