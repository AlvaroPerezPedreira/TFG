import React, { useState, useRef } from "react";
import "./styles/dateModal.css";
import { Button, Input } from "@mirakle-ui/react";
import { useTranslation } from "react-i18next";

const DateModal = ({ showModal, closeModal, handleDateChange }) => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [t, i18n] = useTranslation(["register"]);

  const dayInputRef = useRef(null);
  const monthInputRef = useRef(null);
  const yearInputRef = useRef(null);

  const handleInputChange = (setter, value, maxLength, nextInputRef) => {
    if (value.length <= maxLength) {
      setter(value);
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
      closeModal();
    } else {
      alert("Por favor, complete todos los campos correctamente.");
    }
  };

  return (
    showModal && (
      <div className="register-modal-background">
        <div className="register-modal-content">
          <button
            className="register-modal-close-button"
            onClick={closeModal}
          />
          <h2>{t("birthDateModal")}</h2>
          <Input
            name="day"
            text={t("day")}
            textColor="white"
            variant="underlined"
            labelColor="white"
            underlineColor="#FFDB58"
            width="50px"
            value={day}
            onChange={(e) =>
              handleInputChange(setDay, e.target.value, 2, dayInputRef)
            }
          />
          <Input
            name="month"
            text={t("month")}
            textColor="white"
            variant="underlined"
            labelColor="white"
            underlineColor="#FFDB58"
            width="50px"
            customWidth
            value={month}
            onChange={(e) =>
              handleInputChange(setMonth, e.target.value, 2, monthInputRef)
            }
          />
          <Input
            name="year"
            text={t("year")}
            textColor="white"
            variant="underlined"
            labelColor="white"
            underlineColor="#FFDB58"
            width="50px"
            customWidth
            value={year}
            onChange={(e) =>
              handleInputChange(setYear, e.target.value, 4, yearInputRef)
            }
          />
          <div className="register-modal-button">
            <Button
              onClick={handleContinue}
              children={t("continue")}
              radius="none"
              customWidth="100%"
              customColor="#FFDB58"
              blackText
              customRippleColor="black"
            ></Button>
          </div>
        </div>
      </div>
    )
  );
};

export default DateModal;
