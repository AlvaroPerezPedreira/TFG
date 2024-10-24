import "./styles/home.css";
import React, { useEffect } from "react";
import { startTransition, Suspense } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import useGetLodges from "../hooks/useGetLodges";
import { useLodgeStore } from "../store/useLodgeStore";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import HotelsList from "./HotelsList";
import SearchBar from "./GlobalComponents/SearchBar";

const TestPage = () => {
  const [t] = useTranslation(["welcome"]);
  let navigate = useNavigate();
  const { lodges } = useLodgeStore();
  const { getLodges } = useGetLodges();

  useEffect(() => {
    getLodges(0, 12);
  }, []);

  return (
    <>
      <Suspense fallback="loading">
        <Navbar />
        <div className="home-container">
          <SearchBar />
          <br />
          <div className="flex flex-wrap justify-center">
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
                </CardBody>
              </Card>
            ))}
          </div>

          <br />
          <br />
          <br />

          <HotelsList />
        </div>
      </Suspense>
    </>
  );
};

export default TestPage;
