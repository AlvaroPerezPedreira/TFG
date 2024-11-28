import { useLodgeStore } from "../store/useLodgeStore";

const useGetLodges = () => {
  const { lodges, setLodges } = useLodgeStore();

  const getLodges = async (page, size) => {
    const response = await fetch(
      `http://localhost:8080/api/lodges/?page=${page}&size=${size}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    const finalData = await response.json();

    if (!response.ok) {
      return;
    }
    setLodges(finalData.content);
    return finalData;
  };

  const getMyLodges = async ({ token, setLodges }) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/lodges/myLodges`,
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
      setLodges(finalData);
    } catch (error) {
      console.error("Error getting my lodges:", error);
    }
  };

  return { getLodges, getMyLodges };
};

export default useGetLodges;
