import "./styles/updateProfile.css";
import { Suspense, useRef, useState } from "react";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import useUpdateProfile from "../../hooks/useUpdateProfile";
import { useAuthContext } from "../../context/AuthContext";

import UpdateProfileDatePicker from "./UpdateProfileComponents/UpdateProfileDatePicker";
import GenderRadioGroup from "./UserComponents/GenderRadioGroup";
import FlagDropdown from "../FlagDropdown";
import UpdateProfileFirstInputs from "./UpdateProfileComponents/UpdateProfileFirstInputs";
import UpdateProfileSecondInputs from "./UpdateProfileComponents/UpdateProfileSecondInputs";

const Auth = () => {
  const { updateProfile } = useUpdateProfile();

  const [t, i18n] = useTranslation(["updProfile"]);
  const [message, setMessage] = useState(""); // Para mostrar mensajes de éxito o error del avatar
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null); // Crear una referencia al input

  const { authUser, setAuthUser } = useAuthContext();

  const [birthdate, setBirthdate] = useState(authUser.user?.birthdate || "");
  const [gender, setGender] = useState(authUser.user?.gender || "male");

  const [formData, setFormData] = useState({
    username: authUser.user?.username || "",
    name: authUser.user?.name || "",
    lastname: authUser.user?.lastname || "",
    phone: authUser.user?.phone || "",
    birthdate: birthdate,
    country: authUser.user?.country || "",
    gender: gender,
    address: authUser.user?.address || "",
    passport: authUser.user?.passport || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    await updateProfile(e, birthdate, gender);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
    <Suspense fallback="loading">
      <div className="updProfile-container">
        <div className="updProfile-form-container">
          <div className="updProfile-header-container">
            <div className="updProfile-logo">
              <Link to="/" className="updProfile-deepdive-link">
                <img
                  src="/images/logo/Logo1op4.jpg"
                  alt="Logo"
                  className="updProfile-logo-img"
                />
                <span>DeepDive</span>
              </Link>
            </div>
            <div className="updProfile-dropdown-container">
              <FlagDropdown />
            </div>
          </div>

          <form className="updProfile-form" onSubmit={handleSubmit}>
            <div className="updProfile-personal-data">
              <div className="updProfile-personal-data-1">
                <UpdateProfileFirstInputs
                  formData={formData}
                  handleInputChange={handleInputChange}
                />
              </div>
              <div className="updProfile-personal-data-2">
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
              </div>
            </div>

            <div className="updProfile-personal-data-3">
              <div className="updProfile-personal-data-4">
                <UpdateProfileSecondInputs
                  formData={formData}
                  handleInputChange={handleInputChange}
                />

                <div className="updProfile-birthdate-form-group">
                  <UpdateProfileDatePicker
                    birthdate={birthdate}
                    setBirthdate={setBirthdate}
                  />
                </div>
              </div>

              <div className="updProfile-personal-data-5">
                <div className="updProfile-gender-form-group">
                  <GenderRadioGroup gender={gender} setGender={setGender} />
                </div>
              </div>
            </div>

            <div className="updProfile-button-container">
              <Button
                className="bg-[#FFDB58] text-black w-full"
                color="deepdive"
                type="submit"
                children={t("update")}
                radius="none"
              />
            </div>
          </form>
        </div>
      </div>
    </Suspense>
  );
};

export default Auth;
