import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import React, { useState } from "react";

const HotelsList = () => {
  const [hotels, setHotels] = useState([]);

  const fetchHotels = async () => {
    try {
      const response = await fetch(
        "https://booking-com.p.rapidapi.com/v1/hotels/search?page_number=0&adults_number=2&room_number=1&units=metric&checkout_date=2025-01-19&dest_id=-1456928&filter_by_currency=AED&dest_type=city&checkin_date=2025-01-18&order_by=popularity&locale=en-gb",
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
        setHotels(data.result); // Ajusta esto según la estructura del resultado
      } else {
        console.error("Error al obtener los datos:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Button onClick={fetchHotels}>Buscar Hoteles</Button>
      <Button onClick={() => setHotels([])}>Limpiar</Button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {hotels.map((hotel, index) => (
          <Card key={index}>
            <CardBody>
              <h3>{hotel.hotel_name}</h3>
              <p>Address: {hotel.address}</p>
              <small className="text-default-500">
                Precio:
                {
                  hotel.composite_price_breakdown.gross_amount_per_night
                    .amount_rounded
                }
              </small>
              <img alt="" src={hotel.max_photo_url} />
            </CardBody>
            <CardFooter>
              <Button auto flat href={hotel.url}>
                Ver más
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HotelsList;
