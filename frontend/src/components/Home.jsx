import React from "react";
import { useTranslation } from "react-i18next";
import Navbar from "./Navbar";
import "./styles/home.css";

const Home = () => {
  const [t, i18n] = useTranslation(["welcome"]);

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
          method="POST"
          encType="multipart/form-data"
          action="http://localhost:8080/api/images/uploadImage"
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
    </>
  );
};

export default Home;
