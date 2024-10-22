import React, { useEffect, useState } from "react";
import { startTransition, Suspense } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "./Navbar";
import { Button } from "@nextui-org/button";
import { useNavigate } from "react-router-dom";
import useGetLodges from "../hooks/useGetLodges";
import { useLodgeStore } from "../store/useLodgeStore";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import HeartIcon1 from "../icons/HeartIcon1";
import HeartIcon2 from "../icons/HeartIcon2";

const TestPage = () => {
  const [t] = useTranslation(["welcome"]);
  let navigate = useNavigate();
  const [isFav, setIsFav] = useState(false);

  const { lodges } = useLodgeStore();
  const { getLodges } = useGetLodges();

  useEffect(() => {
    getLodges(0, 9);
  }, []);

  const toggleFav = () => {
    setIsFav(!isFav);
  };

  return (
    <>
      <Suspense fallback="loading">
        <Navbar />
        <div className="home-container">
          <h1>{t("test")}</h1>
        </div>
        <br />

        <br />
        <br />

        {lodges.map((lodge) => (
          <Card
            isHoverable
            className="py-4"
            isPressable
            onPress={() => {
              startTransition(() => {
                navigate(`/lodges/${lodge.id}`);
              });
            }}
          >
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <h4 className="font-bold text-large">{lodge.lodge_name}</h4>
              <p className="text-tiny">Provider: {lodge.lodge_provider}</p>
              <small className="text-default-500">
                Price (per night): {lodge.price_per_night}
              </small>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src={`http://localhost:8080/images/${lodge.images[0].image_url}`}
                width={270}
              />
              <CardFooter className="justify-between absolute before:rounded-xl bottom-1 w-[calc(100%_-_25px)] ml-1 z-10 bg-transparent !bg-none">
                <Button
                  className="bg-transparent"
                  isIconOnly
                  onClick={toggleFav}
                >
                  {isFav ? <HeartIcon2 /> : <HeartIcon1 />}
                </Button>
              </CardFooter>
            </CardBody>
          </Card>
        ))}
      </Suspense>
    </>
  );
};

export default TestPage;
