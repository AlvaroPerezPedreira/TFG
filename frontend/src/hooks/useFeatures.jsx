const useFeatures = () => {
  const getAllFeatures = async ({ setFeatures }) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/lodges/getFeatures`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const finalData = await response.json();
      setFeatures(finalData);
    } catch (error) {
      console.error("Error getting all features user:", error);
    }
  };

  return { getAllFeatures };
};

export default useFeatures;
