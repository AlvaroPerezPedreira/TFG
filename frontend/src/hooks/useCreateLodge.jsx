import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import { useLodgeStore } from "../store/useLodgeStore";

const useCreateLodge = (e) => {
  let navigate = useNavigate();
  const { addLodge } = useLodgeStore();

  const token = JSON.parse(localStorage.getItem("authUser")).serviceToken;

  const createLodge = async (
    e,
    checkIn,
    checkOut,
    country,
    images,
    features
  ) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      lodge_email: form.get("email"),
      lodge_name: form.get("name"),
      lodge_description: form.get("description"),
      lodge_address: form.get("address"),
      lodge_phone: form.get("phone"),
      city: form.get("city"),
      country: country,
      available_rooms: Number(form.get("rooms")),
      price_per_night: parseFloat(form.get("pricePerNight")),
      check_in: checkIn,
      check_out: checkOut,
      images: images.map((image) => ({
        image_url: `${form.get("email")}_${image.image_url}`,
      })),
      features: features,
    };

    console.log(data);

    const response = await fetch(
      "http://localhost:8080/api/lodges/createLodge",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    const finalData = await response.json();

    if (!response.ok) {
      return;
    }

    console.log(finalData);
    addLodge(finalData);

    navigate("/");
  };

  return { createLodge };
};

export default useCreateLodge;
