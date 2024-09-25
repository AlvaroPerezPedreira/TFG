import { Button, ButtonGroup } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "./styles/dateModal.css";

export default function ModalContentBirthdate({
  onClose,
  handleDateChange,
  birthdate,
}) {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [t, i18n] = useTranslation(["register"]);

  const dayInputRef = useRef(null);
  const monthInputRef = useRef(null);
  const yearInputRef = useRef(null);

  useEffect(() => {
    if (birthdate) {
      const [day, month, year] = birthdate.split("-");
      setDay(day);
      setMonth(month);
      setYear(year);
    }
  }, [birthdate]);

  const handleInputChange = (setter, value, maxLength, nextInputRef) => {
    if (value.length <= maxLength) {
      setter(value);
      console.log(day);
      if (value.length === maxLength) {
        if (nextInputRef && nextInputRef.current) {
          nextInputRef.current.focus();
        } else {
          console.warn("No ref available for next input");
        }
      }
    }
  };

  const handleContinue = () => {
    if (day.length === 2 && month.length === 2 && year.length === 4) {
      handleDateChange(`${day}-${month}-${year}`);
      onClose();
    } else {
      alert("Por favor, complete todos los campos correctamente.");
    }
  };

  return (
    <div>
      <h2>{t("birthDateModal")}</h2>
      <Input
        name="day"
        placeholder={t("day")}
        variant="underlined"
        value={day}
        onChange={(e) =>
          handleInputChange(setDay, e.target.value, 2, dayInputRef)
        }
      />
      <Input
        name="month"
        placeholder={t("month")}
        variant="underlined"
        value={month}
        onChange={(e) =>
          handleInputChange(setMonth, e.target.value, 2, monthInputRef)
        }
      />
      <Input
        name="year"
        placeholder={t("year")}
        variant="underlined"
        value={year}
        onChange={(e) =>
          handleInputChange(setYear, e.target.value, 4, yearInputRef)
        }
      />
      <div className="register-modal-button">
        <Button
          onPress={handleContinue}
          children={t("continue")}
          className="bg-[#FFDB58] text-black w-full"
          radius="none"
          type="submit"
        ></Button>
      </div>
    </div>
  );
}
