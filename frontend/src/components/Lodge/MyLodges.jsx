import "./styles/mylodges.css";
import React, { startTransition, Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AppNavbar from "../AppNavbar";
import useGetLodges from "../../hooks/useGetLodges";
import MyLodgesCard from "./LodgeComponents/MyLodgesCard";
import Footer from "../Footer";

function MyLodges() {
  const [t] = useTranslation(["lodge"]);
  const [lodges, setLodges] = useState([]);
  const { getMyLodges } = useGetLodges();
  const token = JSON.parse(localStorage.getItem("authUser")).serviceToken;

  useEffect(() => {
    getMyLodges({ token, setLodges });
  }, []);

  console.log(lodges);

  return (
    <>
      <Suspense fallback="loading">
        <AppNavbar />
        <div className="myLodges-container">
          <div className="myLodges-titleContainer">
            <span className="myLodges-title">{t("myLodgesTitle")}</span>
          </div>
          {lodges.length === 0 ? (
            <div className="myLodges-noLodgesMessage">
              {t("noLodgesMessage")}
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: "20px",
                marginTop: "20px",
              }}
            >
              {lodges.map((lodge, index) => (
                <MyLodgesCard
                  key={index}
                  lodge_email={lodge.lodge_email}
                  lodge_name={lodge.lodge_name}
                  price_per_night={lodge.price_per_night}
                  lodge_provider={lodge.lodge_provider}
                  is_closed={lodge.is_closed}
                  image_url={
                    lodge.images && lodge.images.length > 0
                      ? `http://localhost:8080/images/${lodge.images[0].image_url}`
                      : "http://localhost:8080/images/Default_LodgeImage.jpg"
                  }
                />
              ))}
            </div>
          )}
        </div>
        <Footer />
      </Suspense>
    </>
  );
}

export default MyLodges;
