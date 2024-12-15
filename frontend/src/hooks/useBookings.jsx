import { useTranslation } from "react-i18next";

const useBookings = () => {
  const [t, i18n] = useTranslation(["lodgeDetails"]);

  const getMyBookings = async ({ token, setBookings }) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/bookings/myBookings`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const finalData = await response.json();

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      setBookings(finalData);
    } catch (error) {
      console.error("Error getting my bookings:", error);
    }
  };

  const getAvailability = async ({
    token,
    setAvailability,
    lodgeEmail,
    checkIn,
    checkOut,
    setErrorMsg,
  }) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/bookings/checkAvailability?lodgeEmail=${lodgeEmail}&check_in=${checkIn}&check_out=${checkOut}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const finalData = await response.json();

      if (!response.ok) {
        setErrorMsg(t("errorAvailability"));
        throw new Error(`Error: ${response.status}`);
      }
      if (finalData) {
        setErrorMsg("");
      } else {
        setErrorMsg(t("noAvailability"));
      }
      setAvailability(finalData);
    } catch (error) {
      console.error("Error getting availability:", error);
    }
  };

  return { getMyBookings, getAvailability };
};

export default useBookings;
