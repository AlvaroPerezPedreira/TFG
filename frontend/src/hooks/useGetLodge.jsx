const useGetLodge = () => {
  const token = JSON.parse(localStorage.getItem("authUser")).serviceToken;

  const getLodge = async (email) => {
    console.log("email", email);
    try {
      const response = await fetch(
        `http://localhost:8080/api/lodges/${email}`,
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
      } else {
        const data = await response.json();
        console.log("data", data);
        return data;
      }
    } catch (error) {
      console.error("Error getting lodge:", error);
    } finally {
    }
  };
  return { getLodge };
};

export default useGetLodge;
