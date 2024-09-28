import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "./Navbar";
import "./styles/home.css";
import { useAuthContext } from "../context/AuthContext";

const Home = () => {
  const [t, i18n] = useTranslation(["welcome"]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState(""); // Para mostrar mensajes de éxito o error
  const { authUser, setAuthUser } = useAuthContext();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita la recarga de la página

    if (!selectedFile) {
      setMessage("Por favor, selecciona una imagen antes de subir.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(
        "http://localhost:8080/api/images/uploadImage",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authUser.serviceToken}`,
          },
          body: formData,
        }
      );

      const result = await response.text();
      console.log(result);

      setAuthUser({ ...authUser, user: { ...authUser.user, avatar: result } });

      if (response.ok) {
        setMessage(`Imagen subida correctamente: ${result}`);
      } else {
        setMessage("Error al subir la imagen.");
      }
    } catch (error) {
      setMessage("Error en la petición: " + error.message);
    }
  };

  return (
    <>
      <Navbar />

      <div className="home-container">
        <h1>{t("title")}</h1>
        <h2>{t("description")}</h2>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          backgroundColor: "black",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <input
            type="file"
            name="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{
              marginBottom: "10px", // Añadido para margen y visibilidad
            }}
          />

          <button
            type="submit"
            style={{
              backgroundColor: "white", // Asegura visibilidad del botón
              color: "black",
              padding: "10px 20px",
            }}
          >
            Subir Imagen
          </button>
        </form>
      </div>

      {message && (
        <div style={{ marginTop: "20px", textAlign: "center", color: "white" }}>
          <p>{message}</p>
        </div>
      )}

      <div>
        <img
          src={`http://localhost:8080/images/${authUser.user.avatar}`}
          alt=""
        />
      </div>
    </>
  );
};

export default Home;
