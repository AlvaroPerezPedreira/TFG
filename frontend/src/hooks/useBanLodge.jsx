import { useNavigate } from "react-router-dom";
import { useBannedLodgesStore } from "../store/useBannedLodgesStore";

const useBanLodge = () => {
  let navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("authUser")).serviceToken;
  const { lodges, setLodges } = useBannedLodgesStore();

  const banLodge = async (email) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/lodges/banLodge/${email}`,
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
      console.error("Error banning lodge:", error);
    }
  };

  const unbanLodge = async (email) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/lodges/unbanLodge/${email}`,
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
      console.error("Error unbanning lodge:", error);
    }
  };

  const getBannedLodges = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/lodges/findAllBannedLodges`,
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
      setLodges(finalData.content);
      return finalData;
    } catch (error) {
      console.error("Error getting banned lodges:", error);
    }
  };

  return { banLodge, unbanLodge, getBannedLodges };
};

export default useBanLodge;
