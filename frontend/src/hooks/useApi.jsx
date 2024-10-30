import { useFiltersStore } from "../store/useFiltersStore";

const useApi = () => {
  const { filters } = useFiltersStore();
  const { adults, children, rooms, checkIn, checkOut } = filters;

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
      let url = `https://booking-com.p.rapidapi.com/v1/hotels/search?page_number=${pageN}&adults_number=${adults}&room_number=${rooms}&units=metric&checkout_date=${checkOut}&dest_id=${destId}&filter_by_currency=AED&dest_type=city&checkin_date=${checkIn}&order_by=popularity&locale=en-gb`;

      if (children !== 0) {
        url += `&children_number=${children}`;
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "booking-com.p.rapidapi.com",
          "x-rapidapi-key":
            "7e41a53217mshbd5a3caf00bccebp154d2ajsn10ab552e5d64",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setApiLodges(data.result);
      } else {
        console.log(
          `Fetching hotels with: pageN=${pageN}, adults=${adults}, children=${children}, rooms=${rooms}, checkIn=${checkIn}, checkOut=${checkOut}, destId=${destId}`
        );
        const errorResponse = await response.text();
        console.error(
          "Error al obtener los datos:",
          response.statusText,
          errorResponse
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getLodgeDetails = async (hotel_id, currentLanguage) => {
    let locale;

    switch (currentLanguage) {
      case "es":
        locale = "es";
        break;
      case "en":
        locale = "en-gb";
        break;
      case "fr":
        locale = "fr";
        break;
      default:
        locale = "en-gb";
    }

    try {
      const response = await fetch(
        `https://booking-com.p.rapidapi.com/v1/hotels/data?hotel_id=${hotel_id}&locale=${locale}`,
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
        return data;
      } else {
        console.log("Error retreving lodge details", hotel_id);
        const errorResponse = await response.text();
        console.error(
          "Error al obtener los datos:",
          response.statusText,
          errorResponse
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return { fetchDestId, fetchHotels, getLodgeDetails };
};

export default useApi;
