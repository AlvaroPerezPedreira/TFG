import React, { Suspense, useEffect, useState } from "react";
import Navbar from "../Navbar";
import SearchBar from "../GlobalComponents/SearchBar";
import { useParams, useLocation } from "react-router-dom";
import { Button } from "@nextui-org/button";
import LodgeCard from "./LodgeComponents/LodgeCard";

export default function LodgeSearch() {
  const { destination } = useParams();
  const location = useLocation();
  const [apiLodges, setApiLodges] = useState([]);
  const [pageN, setPageN] = useState(0);
  const [destId, setDestId] = useState(0);

  const { adults, rooms, checkIn, checkOut } = location.state || {};

  const fetchDestId = async () => {
    try {
      const response = await fetch(
        `https://booking-com.p.rapidapi.com/v1/hotels/locations?locale=en-gb&name=${destination}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "booking-com.p.rapidapi.com",
            "x-rapidapi-key":
              "8bf4a3930cmsh172e9d4c9ef7ca7p1c5af9jsn3b3e6c2012c2",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setDestId(data[0].dest_id);
      } else {
        console.error("Error al obtener los datos1:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchHotels = async () => {
    try {
      const response = await fetch(
        `https://booking-com.p.rapidapi.com/v1/hotels/search?page_number=${pageN}&adults_number=${adults}&room_number=${rooms}&units=metric&checkout_date=${checkOut}&dest_id=${destId}&filter_by_currency=AED&dest_type=city&checkin_date=${checkIn}&order_by=popularity&locale=en-gb`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "booking-com.p.rapidapi.com",
            "x-rapidapi-key":
              "8bf4a3930cmsh172e9d4c9ef7ca7p1c5af9jsn3b3e6c2012c2",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data.result);
        setApiLodges(data.result); // Ajusta esto según la estructura del resultado
      } else {
        console.log(
          `Fetching hotels with: pageN=${pageN}, adults=${adults}, rooms=${rooms}, checkIn=${checkIn}, checkOut=${checkOut}, destId=${destId}`
        );
        const errorResponse = await response.text();
        console.error(
          "Error al obtener los datos2:",
          response.statusText,
          errorResponse
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    setApiLodges([]);
    fetchDestId();
  }, [destination]);

  useEffect(() => {
    if (destId) {
      fetchHotels();
    }
  }, [destId, adults, rooms, checkIn, checkOut, pageN]);

  return (
    <Suspense fallback="loading">
      <Navbar />
      <div className="lodgeSearch-container">
        <SearchBar />
        <Button
          onClick={() => console.log(destId, adults, rooms, checkIn, checkOut)}
        >
          Ver datos
        </Button>
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
