import React, { useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { useRef } from "react";

export default function UpdateProfileAvatar() {
  const { authUser, setAuthUser } = useAuthContext();
  const fileInputRef = useRef(null); // Crear una referencia al input
  const [message, setMessage] = useState(""); // Para mostrar mensajes de éxito o error del avatar
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (!file) {
      setMessage("Por favor, selecciona una imagen antes de subir.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Realizar la petición de subida de la imagen inmediatamente
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

  const handleDivClick = () => {
    fileInputRef.current.click(); // Simular click en el input
  };

  return (
    <>
      {/* El input de archivo está oculto */}
      <input
        type="file"
        name="file"
        accept="image/*"
        ref={fileInputRef} // Asignamos la referencia al input
        onChange={handleFileChange}
        style={{ display: "none" }} // Escondemos el input
      />

      <img
        src={`http://localhost:8080/images/${authUser.user.avatar}`}
        alt=""
        className="updProfile-avatar-img"
      />

      {/* El div que simula el selector de archivos */}
      <div
        onClick={handleDivClick} // Asignamos el click al div
        className="updProfile-avatar-container"
      ></div>
    </>
  );
}
