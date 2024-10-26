import { useLodgeStore } from "../store/useLodgeStore";

const useGetLodgesByCountry = () => {
  const { addLodges } = useLodgeStore();

  const getLodgesByCountry = async (country, page, size) => {
    const response = await fetch(
      `http://localhost:8080/api/lodges/by-country?country=${country}&page=${page}&size=${size}`,
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

  return { getLodgesByCountry };
};

export default useGetLodgesByCountry;
