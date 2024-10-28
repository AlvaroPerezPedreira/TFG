import "./styles/lodgedetails.css";

import React, { Suspense, startTransition, useEffect, useState } from "react";
import Navbar from "../Navbar";
import { useParams } from "react-router-dom";
import { useLodgeStore } from "../../store/useLodgeStore";
import { User } from "@nextui-org/user";
import { useTranslation } from "react-i18next";
import { Link } from "@nextui-org/link";
import { useNavigate } from "react-router-dom";

export default function LodgeDetails() {
  const { email } = useParams();
  const getLodge = useLodgeStore((state) => state.getLodge);
  const lodge = getLodge(email);
  const [t] = useTranslation(["lodgeDetails"]);
  let navigate = useNavigate();

  console.log(lodge);
  return (
    <Suspense fallback="loading">
      <Navbar />
      <div className="lodgeDetails-container">
        <div className="lodgeDetails-firstinputs-container">
          <div className="lodgeDetails-row">
            <h1 className="lodgeDetails-lodgeName">{lodge.lodge_name}</h1>
            <span className="lodgeDetails-provider">
              <span className="lodgeDetails-providerTitle">
                {t("provider")}:
              </span>
              <span className="lodgeDetails-providerName">
                {lodge.lodge_provider}
              </span>
            </span>
          </div>
          <div className="lodgeDetails-userAvatar">
            <User
              name={lodge.user.name}
              description={
                <Link
                  onClick={() => {
                    startTransition(() => {
                      navigate(`/users/${lodge.user.email}`);
                    });
                  }}
                  size="sm"
                >
                  {lodge.user.email}
                </Link>
              }
              avatarProps={{
                src: `http://localhost:8080/images/${lodge.user.avatar}`,
              }}
            />
          </div>
          <div className="lodgeDetails-row">
            <span className="lodgeDetails-address">{lodge.lodge_address}</span>
          </div>
        </div>

        <div className="lodgeDetails-imageCarousel"></div>
        <div className="lodgeDetails-featureList"></div>
      </div>
    </Suspense>
  );
}
