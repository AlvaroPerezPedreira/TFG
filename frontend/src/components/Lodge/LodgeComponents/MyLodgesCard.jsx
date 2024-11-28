import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/card";
import { startTransition, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@nextui-org/button";
import { useThemeContext } from "../../../context/ThemeContext";
import { EditIcon } from "../../../icons/UserDropdownIcons";
import { ShieldCloseIcon, ShieldOpenIcon } from "../../../icons/ShieldIcons";
import useManageLodges from "../../../hooks/useManageLodges";

export default function MyLodgesCard({
  index,
  lodge_email,
  lodge_name,
  price_per_night,
  lodge_provider,
  image_url,
  is_closed,
  handleClick,
}) {
  const [t] = useTranslation(["lodge"]);
  const { color } = useThemeContext();
  const { closeLodge, openLodge } = useManageLodges();

  // Estado para manejar el cambio de 'is_closed'
  const [isLodgeClosed, setIsLodgeClosed] = useState(is_closed);

  const handleOpenClose = (e) => {
    e.preventDefault();
    // Usamos startTransition para no bloquear la interfaz de usuario
    startTransition(() => {
      if (isLodgeClosed) {
        openLodge(lodge_email).then(() => {
          setIsLodgeClosed(false); // Actualizamos el estado después de abrir el lodge
        });
      } else {
        closeLodge(lodge_email).then(() => {
          setIsLodgeClosed(true); // Actualizamos el estado después de cerrar el lodge
        });
      }
    });
  };

  return (
    <Card key={index} isHoverable className="py-4">
      <CardHeader className="pb-3 pt-0 px-4 flex-col items-start">
        <h2 className="font-bold text-xl pb-2 text-left text-pretty">
          <span style={{ color: "var(--AppMainColor)" }}>{lodge_name} </span>
        </h2>
        <small className="text-sm pb-1">
          {t("price_per_night")} {price_per_night} €
        </small>
        <p className="text-xs text-default-500">
          {t("provider")} {lodge_provider}
        </p>
      </CardHeader>
      <CardBody className="overflow-visible py-2 flex-1 h-full justify-end w-full">
        <img
          alt="Card background"
          className="object-cover rounded-xl min-w-full min-h-[230px] max-h-[230px] bg-red-500"
          src={image_url}
        />
      </CardBody>
      <CardFooter className="flex justify-center mx-auto gap-5">
        <Button
          children={t("editLodge")}
          variant="bordered"
          color={color}
          startContent={<EditIcon />}
          onClick={handleClick}
        />
        {isLodgeClosed ? (
          <Button
            children={t("openLodge")}
            variant="bordered"
            color="success"
            startContent={<ShieldOpenIcon />}
            onClick={handleOpenClose}
          />
        ) : (
          <Button
            children={t("closeLodge")}
            variant="bordered"
            color="danger"
            startContent={<ShieldCloseIcon />}
            onClick={handleOpenClose}
          />
        )}
      </CardFooter>
    </Card>
  );
}
