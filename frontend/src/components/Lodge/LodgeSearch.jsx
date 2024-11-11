import "./styles/lodgesearch.css";
import React, { Suspense, useEffect, useState } from "react";
import SearchBar from "../GlobalComponents/SearchBar";
import { useLocation, useParams } from "react-router-dom";
import LodgeCard from "./LodgeComponents/LodgeCard";
import useApi from "../../hooks/useApi";
import useGetLodgesByPlace from "../../hooks/useGetLodgesByPlace";
import AppNavbar from "../AppNavbar";

export default function LodgeSearch() {
  const { destination } = useParams();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");

  const [lodges, setLodges] = useState([]);
  const [apiLodges, setApiLodges] = useState([]);
  const [pageN, setPageN] = useState(0);
  const [size, setSize] = useState(30);
  const [destId, setDestId] = useState(0);
  const [destType, setDestType] = useState("");
  const { fetchDestId, fetchHotels } = useApi();
  const { getLodgesByPlace } = useGetLodgesByPlace();

  useEffect(() => {
    setLodges([]);
    setApiLodges([]);
    fetchDestId({ destination, setDestId, setDestType });
    getLodgesByPlace(destination, pageN, size, setLodges);
  }, [destination]);

  useEffect(() => {
    if (destId) {
      fetchHotels({ pageN, destId, destType, setApiLodges });
    }
  }, [destId, pageN]);

  return (
    <Suspense fallback="loading">
      <AppNavbar />
      <div className="lodgeSearch-container">
        <SearchBar />
        <br />
        <br />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {lodges.map((lodge, index) => (
            <LodgeCard
              key={index}
              id={lodge.id}
              lodge_email={lodge.lodge_email}
              lodge_name={lodge.lodge_name}
              price_per_night={lodge.price_per_night}
              lodge_provider={lodge.lodge_provider}
              image_url={`http://localhost:8080/images/${lodge.images[0].image_url}`}
            />
          ))}
          {apiLodges.map((lodge, index) => (
            <LodgeCard
              key={index}
              id={lodge.hotel_id}
              lodge_email={`LodgeApi_${lodge.hotel_id}@bookingapi.com`}
              lodge_name={lodge.hotel_name}
              price_per_night={
                lodge.composite_price_breakdown.gross_amount_per_night
                  .amount_rounded
              }
              lodge_provider="Booking.com"
              image_url={lodge.max_photo_url}
              checkIn={checkIn}
              checkOut={checkOut}
            />
          ))}
        </div>
      </div>
    </Suspense>
  );
}
