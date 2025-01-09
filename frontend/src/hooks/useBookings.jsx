import { useTranslation } from "react-i18next";
import toast, { Toaster } from "react-hot-toast";
import ForbiddenIcon from "../icons/ForbiddenIcon";

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

  const bookLodge = async ({
    token,
    checkIn,
    checkOut,
    arrivalTime,
    departureTime,
    totalPrice,
    lodgeEmail,
    isApi,
  }) => {
    const data = {
      check_in: checkIn,
      check_out: checkOut,
      arrival_time: arrivalTime,
      departure_time: departureTime,
      total_price: totalPrice,
      lodgeEmail: lodgeEmail,
      is_api: isApi,
    };

    console.log(data);

    try {
      const response = await fetch(
        `http://localhost:8080/api/bookings/createBooking`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error("Error booking lodge:", error);
    }
  };

  const cancelBooking = async ({ token, bookingId, setIsBookingCancelled }) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/bookings/cancelBooking/${bookingId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.log("dsfasd");
        setIsBookingCancelled(false);
        toast(t("errorCancelBooking"), {
          icon: <ForbiddenIcon />,
          duration: 3000,
          style: {
            borderRadius: "10px",
            backgroundColor: "var(--main-background)",
            border: "1px solid var(--inverted-background-color)",
            color: "var(--errorRed)",
          },
        });
      } else {
        setIsBookingCancelled(true);
      }
    } catch (error) {
      setIsBookingCancelled(false);
      toast(t("errorCancelBooking"), {
        icon: <ForbiddenIcon />,
        duration: 3000,
        style: {
          borderRadius: "10px",
          backgroundColor: "var(--main-background)",
          border: "1px solid var(--inverted-background-color)",
          color: "var(--errorRed)",
        },
      });
      console.error("Error cancelling booking:", error);
    }
  };

  const getTheBooking = async ({ token, setBooking, id }) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/bookings/getTheBooking/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const finalData = await response.json();
      setBooking(finalData);
    } catch (error) {
      console.error("Error getting the booking:", error);
    }
  };

  const getRateBooking = async ({
    token,
    id,
    lodgeEmail,
    description,
    rating,
  }) => {
    const data = {
      review_lodgeEmail: lodgeEmail,
      review_text: description,
      rating: rating,
    };
    try {
      const response = await fetch(
        `http://localhost:8080/api/bookings/reviewBooking/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const finalData = await response.json();
    } catch (error) {
      console.error("Error getting the booking:", error);
    }
  };

  const getHasReviews = async ({ setHasReviews, lodgeEmail }) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/bookings/hasReviews?lodgeEmail=${lodgeEmail}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const finalData = await response.json();

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      setHasReviews(finalData);
    } catch (error) {
      console.error("Error getting availability:", error);
    }
  };

  const getReviews = async ({ setReviews, lodgeEmail, token }) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/bookings/getReviews?lodgeEmail=${lodgeEmail}`,
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
      setReviews(finalData);
    } catch (error) {
      console.error("Error getting reviews:", error);
    }
  };

  const banReview = async ({ token, reviewId }) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/bookings/banReview/${reviewId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error("Error banning review:", error);
    }
  };

  return {
    getRateBooking,
    getTheBooking,
    bookLodge,
    getMyBookings,
    getAvailability,
    cancelBooking,
    getHasReviews,
    getReviews,
    banReview,
  };
};

export default useBookings;
