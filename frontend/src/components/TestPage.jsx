import React, { useEffect } from "react";
import { startTransition, Suspense } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "./Navbar";
import { Button } from "@nextui-org/button";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import useGetLodges from "../hooks/useGetLodges";
import { useLodgeStore } from "../store/useLodgeStore";

const TestPage = () => {
  const [t] = useTranslation(["welcome"]);
  const { authUser } = useAuthContext();
  let navigate = useNavigate();

  const { lodges } = useLodgeStore();
  const { getLodges } = useGetLodges();

  useEffect(() => {
    getLodges(0, 9);
  }, []);

  const handleClick2 = () => {
    console.log(authUser);
  };

  return (
    <>
      <Suspense fallback="loading">
        <Navbar />
        <div className="home-container">
          <h1>{t("test")}</h1>
        </div>
        <br />
        {lodges.map((lodge) => (
          <div key={lodge.id}>
            <h1>{lodge.lodge_name}</h1>
            <p>{lodge.lodge_description}</p>
          </div>
        ))}
        <Button onClick={handleClick2}>authUser</Button>
      </Suspense>
    </>
  );
};

export default TestPage;
