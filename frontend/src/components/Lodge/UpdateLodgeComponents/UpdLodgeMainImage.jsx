import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { BedIcon, ImageIcon } from "../../../icons/MainAppIcons";
import { Button } from "@nextui-org/button";
import { useThemeContext } from "../../../context/ThemeContext";

export default function UpdLodgeMainImage({
  lodgeImage,
  mainImageUrl,
  setMainImageUrl,
  mainImage,
  setMainImage,
}) {
  const [t, i18n] = useTranslation(["createLodge"]);
  const { dark, color } = useThemeContext();

  useEffect(() => {
    if (lodgeImage && !mainImageUrl) {
      setMainImageUrl(`http://localhost:8080/images/${lodgeImage}`);
    }
  }, [lodgeImage, mainImageUrl, setMainImageUrl]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setMainImage(file);
      const url = URL.createObjectURL(file);
      setMainImageUrl(url);
    }
  };

  return (
    <>
      <span
        className="updateLodge-mainImageTitle"
        style={{ color: "var(--AppMainColor)" }}
      >
        {t("mainImageTitle")}
      </span>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
        id="fileInput"
      />

      {mainImageUrl && (
        <div className="updateLodge-mainImagePreview">
          <img
            src={mainImageUrl}
            alt="Vista previa"
            className="updateLodge-mainImage"
            style={{ maxWidth: "100%", maxHeight: 300 }}
          />
        </div>
      )}
      <div className="updateLodge-mainImageButton">
        <Button
          color={color}
          variant="bordered"
          radius="sm"
          startContent={<ImageIcon color={dark ? "#FFDB58" : "#006FEE"} />}
          onClick={() => document.getElementById("fileInput").click()}
        >
          {t("chooseImg")}
        </Button>
      </div>
    </>
  );
}
