import "./styles/bannedlodge.css";
import React, { Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import AppNavbar from "../AppNavbar";
import { useBannedLodgesStore } from "../../store/useBannedLodgesStore";
import useBanLodge from "../../hooks/useBanLodge";
import BannedLodgeCard from "./LodgeComponents/BannedLodgeCard";

function BannedLodges() {
  const [t] = useTranslation(["lodgeDetails"]);
  const { lodges } = useBannedLodgesStore();
  const { getBannedLodges } = useBanLodge();

  useEffect(() => {
    getBannedLodges();
  }, []);

  return (
    <>
      <Suspense fallback="loading">
        <AppNavbar />
        <div className="bannedLodges-container">
          <div className="bannedLodges-titleContainer">
            <span className="bannedLodges-title">{t("bannedLodgesTitle")}</span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            {Array.isArray(lodges) &&
              lodges.map((lodge, index) => (
                <BannedLodgeCard key={lodge.lodge_email} lodge={lodge} />
              ))}
          </div>
        </div>
      </Suspense>
    </>
  );
}

export default BannedLodges;
