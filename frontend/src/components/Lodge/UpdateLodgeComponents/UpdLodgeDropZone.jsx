import { Button } from "@nextui-org/button";
import React, { useEffect, useRef } from "react";
import { ImageIcon } from "../../../icons/MainAppIcons";
import { useTranslation } from "react-i18next";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import CloseIcon from "../../../icons/CloseIcon";
import { useThemeContext } from "../../../context/ThemeContext";

export default function UpdLodgeDropZone({ images, setImages, lodgeImages }) {
  const fileInputRef = useRef(null);
  const [t, i18n] = useTranslation(["createLodge"]);
  const { dark, color } = useThemeContext();

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    addFiles(files);
  };

  const handleFileInputChange = (event) => {
    const files = Array.from(event.target.files);
    addFiles(files);
  };

  const addFiles = (files) => {
    const validImages = files.filter((file) => file.type.startsWith("image/"));

    const newFiles = validImages.filter(
      (file) =>
        !images.some((img) => img.name === file.name && img.size === file.size)
    ); // Evitar duplicados

    if (images.length + newFiles.length > 20) {
      alert("Solo se permiten un máximo de 20 imágenes.");
      return;
    }

    setImages((prevImages) => [...prevImages, ...newFiles]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Simula el clic en el input oculto
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // Borrar imagen
  const handleSubmit = (imageName) => {
    setImages((prevImages) =>
      prevImages.filter((image) => image.name !== imageName)
    );
  };

  useEffect(() => {
    if (lodgeImages && Array.isArray(lodgeImages)) {
      const transformedImages = lodgeImages.slice(1).map((lodgeImage) => ({
        name: lodgeImage.image_url, // Usamos image_url como name
        type: "fromBackend", // Tipo personalizado
        path: `http://localhost:8080/images/${lodgeImage.image_url}`, // URL completa
      }));
      // Añadir estas imágenes al principio de images
      setImages((prevImages) => [...transformedImages, ...prevImages]);
    }
  }, [lodgeImages]);

  return (
    <>
      <span
        className="createLodge-mainImageTitle"
        style={{ color: "var(--AppMainColor)" }}
      >
        {t("imagesTitle")}
      </span>
      <div
        className="createLodge-dropZone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {t("dropZone")}
      </div>
      <div className="createLodge-imagesButton">
        <Button
          color={color}
          variant="bordered"
          radius="sm"
          startContent={<ImageIcon color={dark ? "#FFDB58" : "#006FEE"} />}
          onClick={handleButtonClick}
        >
          {t("chooseImgs")}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileInputChange}
          style={{ display: "none" }}
        />
      </div>
      <div>
        <h4 className="createLodge-dropZonePrerenderTitle">
          {t("imagesCounter")} ({images.length}/20):
        </h4>
        <ul
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {images
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((image, index) => (
              <Card key={image.name} className="py-4">
                <CardHeader className="pb-3 pt-0 px-4 flex items-center justify-between">
                  <h2 className="font-bold text-xl pb-2 text-left text-pretty">
                    <small style={{ color: "var(--AppMainColor)" }}>
                      {image.name}
                    </small>
                  </h2>
                  <Button
                    color="danger"
                    radius="sm"
                    size="sm"
                    variant=""
                    isIconOnly
                    onClick={() => handleSubmit(image.name)}
                  >
                    <CloseIcon />
                  </Button>
                </CardHeader>
                <CardBody className="overflow-visible py-2 flex-1 h-full justify-end w-full">
                  <img
                    alt={image.name}
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: "200px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                    src={
                      image.type === "fromBackend"
                        ? image.path
                        : URL.createObjectURL(image)
                    }
                  />
                </CardBody>
              </Card>
            ))}
        </ul>
      </div>
    </>
  );
}
