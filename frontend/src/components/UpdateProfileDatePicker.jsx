import { DatePicker } from "@nextui-org/date-picker";
import React from "react";
import { useTranslation } from "react-i18next";
import { stringToCalendarDate } from "../Functions/calendarFunctions";

export default function UpdateProfileDatePicker({ birthdate, setBirthdate }) {
  const [t] = useTranslation(["register"]);

  const handleDateChange = (date) => {
    const jsDate = new Date(date);

    const day = String(jsDate.getDate()).padStart(2, "0"); // Asegura que el día tenga dos dígitos
    const month = String(jsDate.getMonth() + 1).padStart(2, "0"); // +1 porque getMonth() empieza desde 0
    const year = jsDate.getFullYear();

    // Formatear la fecha en el formato "DD-MM-YYYY"
    const formattedDate = `${day}-${month}-${year}`;

    console.log("Fecha formateada:", formattedDate);

    setBirthdate(formattedDate);
  };

  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <DatePicker
        label={t("birthdate")}
        visibleMonths={1}
        variant="bordered"
        defaultValue={stringToCalendarDate(birthdate)} // Pasar CalendarDate
        onChange={handleDateChange}
      />
    </div>
  );
}
