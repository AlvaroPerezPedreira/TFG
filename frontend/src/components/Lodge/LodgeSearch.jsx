import "./styles/lodgesearch.css";
import React, { Suspense, useEffect, useState } from "react";
import Navbar from "../Navbar";
import SearchBar from "../GlobalComponents/SearchBar";
import { useParams } from "react-router-dom";
import LodgeCard from "./LodgeComponents/LodgeCard";
import useApi from "../../hooks/useApi";

export default function LodgeSearch() {
  const { destination } = useParams();
  const [apiLodges, setApiLodges] = useState([]);
  const [pageN, setPageN] = useState(0);
  const [destId, setDestId] = useState(0);
  const { fetchDestId, fetchHotels } = useApi();

  useEffect(() => {
    setApiLodges([]);
    fetchDestId({ destination, setDestId });
  }, [destination]);

  useEffect(() => {
    if (destId) {
      fetchHotels({ pageN, destId, setApiLodges });
    }
  }, [destId, pageN]);

  return (
    <Suspense fallback="loading">
      <Navbar />
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
            />
          ))}
        </div>
      </div>
    </Suspense>
  );
}
