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
      navigate("/");
    }
  };
  return { banUser };
};

export default useBanUser;
