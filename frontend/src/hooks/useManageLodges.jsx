const useManageLodges = () => {
  const token = JSON.parse(localStorage.getItem("authUser")).serviceToken;

  const closeLodge = async (email) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/lodges/closeLodge/${email}`,
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
      console.error("Error closing lodge:", error);
    }
  };

  const openLodge = async (email) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/lodges/openLodge/${email}`,
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
      console.error("Error opening lodge:", error);
    }
  };

  return { closeLodge, openLodge };
};

export default useManageLodges;
