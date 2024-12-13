const useBookings = () => {
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

  return { getMyBookings };
};

export default useBookings;
