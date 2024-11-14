import React from "react";
import { useTranslation } from "react-i18next";
import { BedIcon, ImageIcon } from "../../../icons/MainAppIcons";
import { Button } from "@nextui-org/button";

export default function LodgeMainImage({
  mainImageUrl,
  setMainImageUrl,
  mainImage,
  setMainImage,
}) {
  const [t, i18n] = useTranslation(["createLodge"]);

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
        className="createLodge-mainImageTitle"
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
        <div className="createLodge-mainImagePreview" style={{ marginTop: 10 }}>
          <img
            src={mainImageUrl}
            alt="Vista previa"
            style={{ maxWidth: "100%", maxHeight: 300 }}
          />
        </div>
      )}
      <div className="createLodge-mainImageButton">
        <Button
          color="warning"
          variant="bordered"
          radius="sm"
          startContent={<ImageIcon />}
          onClick={() => document.getElementById("fileInput").click()}
        >
          {t("chooseImg")}
        </Button>
      </div>
    </>
  );
}
