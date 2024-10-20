import { useLodgeStore } from "../store/useLodgeStore";

const useGetLodges = () => {
  const { setLodges } = useLodgeStore();

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
    console.log(finalData);
    setLodges(finalData.content);
    return finalData;
  };

  return { getLodges };
};

export default useGetLodges;
