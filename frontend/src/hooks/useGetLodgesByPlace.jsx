import { useLodgeStore } from "../store/useLodgeStore";

const useGetLodgesByPlace = () => {
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

  const getLodgesByPlace = async (place, page, size, setLodges) => {
    const response = await fetch(
      `http://localhost:8080/api/lodges/by-place?place=${place}&page=${page}&size=${size}`,
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
    setLodges(finalData.content);
    return finalData.content;
  };

  return { getLodgesByCity, getLodgesByCountry, getLodgesByPlace };
};

export default useGetLodgesByPlace;
