import { useLodgeStore } from "../store/useLodgeStore";

const useGetLodgesByCity = () => {
  const { addLodges } = useLodgeStore();

  const getLodgesByCity = async (city, page, size) => {
    const response = await fetch(
      `http://localhost:8080/api/lodges/by-city?city=${city}&page=${page}&size=${size}`,
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
    console.log(finalData);
    addLodges(finalData.content);
    return finalData;
  };

  return { getLodgesByCity };
};

export default useGetLodgesByCity;
