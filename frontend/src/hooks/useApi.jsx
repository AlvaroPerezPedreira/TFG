import { useFiltersStore } from "../store/useFiltersStore";

const useApi = () => {
  const { filters } = useFiltersStore();
  const { adults, rooms, checkIn, checkOut } = filters;

  const fetchDestId = async ({ destination, setDestId }) => {
    try {
      const response = await fetch(
        `https://booking-com.p.rapidapi.com/v1/hotels/locations?locale=en-gb&name=${destination}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "booking-com.p.rapidapi.com",
            "x-rapidapi-key":
              "7e41a53217mshbd5a3caf00bccebp154d2ajsn10ab552e5d64",
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

  const fetchHotels = async ({ pageN, destId, setApiLodges }) => {
    try {
      const response = await fetch(
        `https://booking-com.p.rapidapi.com/v1/hotels/search?page_number=${pageN}&adults_number=${adults}&room_number=${rooms}&units=metric&checkout_date=${checkOut}&dest_id=${destId}&filter_by_currency=AED&dest_type=city&checkin_date=${checkIn}&order_by=popularity&locale=en-gb`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "booking-com.p.rapidapi.com",
            "x-rapidapi-key":
              "7e41a53217mshbd5a3caf00bccebp154d2ajsn10ab552e5d64",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
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

  return { fetchDestId, fetchHotels };
};

export default useApi;
