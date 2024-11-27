import { useNavigate } from "react-router-dom";
import { useBannedUsersStore } from "../store/useBannedUsersStore";

const useBanUser = () => {
  let navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("authUser")).serviceToken;
  const { users, setUsers } = useBannedUsersStore();

  const banUser = async (email) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/users/banUser/${email}`,
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
      console.error("Error banning user:", error);
    }
  };

  const unbanUser = async (email) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/users/unbanUser/${email}`,
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
      console.error("Error unbanning user:", error);
    }
  };

  const getBannedUsers = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/users/findAllBannedUsers`,
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
      setUsers(finalData.content);
      return finalData;
    } catch (error) {
      console.error("Error getting banned users:", error);
    }
  };

  return { banUser, unbanUser, getBannedUsers };
};

export default useBanUser;
