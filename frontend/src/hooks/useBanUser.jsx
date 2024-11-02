import { useNavigate } from "react-router-dom";

const useBanUser = () => {
  let navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("authUser")).serviceToken;

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
    } finally {
      navigate(`/users/${email}`);
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
    } finally {
      navigate(`/users/${email}`);
    }
  };

  return { banUser, unbanUser };
};

export default useBanUser;
