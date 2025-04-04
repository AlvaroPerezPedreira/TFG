import { useFiltersStore } from "../store/useFiltersStore";

const RAPIDAPI_HOST = "booking-com.p.rapidapi.com";
const RAPIDAPI_KEY = "c49223a641msh80a676e719b5656p15ee2ajsnbc2d1186287f";

const useApi = () => {
  const { filters } = useFiltersStore();
  const { adults, children, rooms, checkIn, checkOut } = filters;

  const fetchDestId = async ({ destination, setDestId, setDestType }) => {
    try {
      const response = await fetch(
        `https://${RAPIDAPI_HOST}/v1/hotels/locations?locale=en-gb&name=${destination}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": RAPIDAPI_HOST,
            "x-rapidapi-key": RAPIDAPI_KEY,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setDestId(data[0].dest_id);
        setDestType(data[0].dest_type);
      } else {
        console.error("Error al obtener los datos1:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchHotels = async ({ pageN, destId, destType, setApiLodges }) => {
    try {
      let url = `https://${RAPIDAPI_HOST}/v1/hotels/search?page_number=${pageN}&adults_number=${adults}&room_number=${rooms}&units=metric&checkout_date=${checkOut}&dest_id=${destId}&filter_by_currency=EUR&dest_type=${destType}&checkin_date=${checkIn}&order_by=popularity&locale=en-gb`;

      if (children !== 0) {
        url += `&children_number=${children}`;
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "x-rapidapi-host": RAPIDAPI_HOST,
          "x-rapidapi-key": RAPIDAPI_KEY,
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
        `https://${RAPIDAPI_HOST}/v1/hotels/data?hotel_id=${hotel_id}&locale=${locale}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": RAPIDAPI_HOST,
            "x-rapidapi-key": RAPIDAPI_KEY,
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

  const getLodgeDetailsCheckInOut = async (
    hotel_id,
    currentLanguage,
    checkIn,
    checkOut
  ) => {
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
        `https://${RAPIDAPI_HOST}/v2/hotels/details?locale=${locale}&checkin_date=${checkIn}&hotel_id=${hotel_id}&currency=EUR&checkout_date=${checkOut}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": RAPIDAPI_HOST,
            "x-rapidapi-key": RAPIDAPI_KEY,
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

  const getLodgePhotos = async ({ hotel_id }) => {
    try {
      const response = await fetch(
        `https://${RAPIDAPI_HOST}/v1/hotels/photos?hotel_id=${hotel_id}&locale=en-gb`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": RAPIDAPI_HOST,
            "x-rapidapi-key": RAPIDAPI_KEY,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Error al obtener los datos1:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return {
    fetchDestId,
    fetchHotels,
    getLodgeDetails,
    getLodgeDetailsCheckInOut,
    getLodgePhotos,
  };
};

export default useApi;
